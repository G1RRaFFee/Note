import { UserRepository } from 'src/core/repositories/user/user.repository';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { User } from 'src/core/entities/user.entity';
import { CreateUserDto } from 'src/core/repositories/user/dto/create.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from 'src/core/repositories/user/dto/update.dto';

@Injectable()
export class PostgresUserRepository implements UserRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
      },
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  public async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    return user;
  }

  public async removeUserById(id: number): Promise<void> {
    await this.prismaService.user.delete({ where: { id: id } });
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }

  public async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
  }
}
