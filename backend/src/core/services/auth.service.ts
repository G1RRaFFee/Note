// import { ConflictException, Injectable } from '@nestjs/common';
// import { RegisterDto } from '../repositories/AuthRepository/dto/register.dto';
// import { UserService } from './user.service';
// import { JwtService } from '@nestjs/jwt';
// import { AuthMethod, User } from '@prisma/client';
// import { compare } from 'bcrypt';

// @Injectable()
// export class AuthService {
//   public constructor(
//     private readonly jwtService: JwtService,
//     private readonly userService: UserService,
//   ) {}

//   public async validateUser(
//     email: string,
//     password: string,
//   ): Promise<User | null> {
//     const user = await this.userService.findByEmail(email);
//     if (user && (await compare(password, user.password))) return user;

//     return null;
//   }

//   public async generateTokens(user: User) {
//     const payload = { sub: user.id, email: user.email };
//     const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
//     const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

//     // await this.prisma.refreshToken.create({
//     //   data: {
//     //     token: refreshToken,
//     //     userId: user.id,
//     //     expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     //   },
//     // });

//     // return { accessToken, refreshToken };
//   }

//   public async refreshTokens(refreshToken: string) {
//     const tokenRecord = await this.prisma.refreshToken.findUnique({
//       where: { token: refreshToken },
//     });

//     if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
//       throw new Error('Refresh token is invalid or expired');
//     }

//     const user = await this.prisma.user.findUnique({
//       where: { id: tokenRecord.userId },
//     });
//     return this.generateTokens(user);
//   }
// }
