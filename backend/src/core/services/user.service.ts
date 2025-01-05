import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

import { User } from '@prisma/client';

@Injectable()
export class UserService {
  // constructor(private readonly userRepository: UserRepository) {}
  public constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: number): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    return user;
  }

  public async create(
    email: string,
    password: string,
    username: string,
  ): Promise<User | null> {
    const user = await this.prismaService.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });

    return user;
  }
}
