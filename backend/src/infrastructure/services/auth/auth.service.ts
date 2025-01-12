import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from '../../../core/repositories/auth/dto/signup.dto';
import { UserService } from 'src/core/services/user.service';
import { hash, compare } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/infrastructure/services/prisma/prisma.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(signUpData: SignUpDto): Promise<User | null> {
    // Проверка на существование email
    // Хеширование пароля
    // Создание и сохранения пользователя в бд
    const { username, email, password } = signUpData;
    const isUserExist = await this.userService.findByEmail(email);
    if (isUserExist) throw new BadRequestException();

    const hashedPassword = await hash(password, 10);

    return await this.userService.create(email, hashedPassword, username);
  }

  public async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // Проверка на существования пользователя
    // Проверка паролей
    // Генерация JWT
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const isPasswordEquals = await compare(password, user.password);
    if (!isPasswordEquals) throw new UnauthorizedException();

    const payload = { subset: user.id, email: user.email };
    return await this.generateTokens(payload.subset);
  }

  public async generateTokens(userId: number) {
    const accessToken = this.jwtService.sign(
      { id: userId },
      {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
        secret: process.env.JWT_SECRET,
      },
    );
    const refreshToken = uuidv4();
    await this.saveRefreshToken(userId, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  public async saveRefreshToken(userId: number, token: string) {
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 3);

    // Проверка существования токена
    const existingToken = await this.prismaService.refreshToken.findUnique({
      where: { userId: userId },
    });

    if (existingToken) {
      // Если токен существует, обновляем его
      await this.prismaService.refreshToken.update({
        where: { userId: userId },
        data: {
          token: token,
          expiresAt: expiresDate,
        },
      });
    } else {
      // Если токена нет, создаем новый
      await this.prismaService.refreshToken.create({
        data: {
          token: token,
          expiresAt: expiresDate,
          userId: userId,
        },
      });
    }
  }

  public async refreshTokens(refreshToken: string) {
    const tokenRecord = await this.prismaService.refreshToken.findFirst({
      where: {
        token: refreshToken,
        expiresAt: {
          gte: new Date(), // Проверяем, что токен не истек
        },
      },
    });

    // Если токен не найден или истек, выбрасываем исключение
    if (!tokenRecord) throw new UnauthorizedException('Некорректный токен');

    // Генерируем новые токены на основе userId
    return this.generateTokens(tokenRecord.userId);
  }

  public async logout(refreshToken: string) {
    const token = await this.prismaService.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });
    return token;
  }
}
