import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user/user.repository';

@Injectable()
export class UserService {
  public constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  public async findById(id: number): Promise<User | null> {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.getUserByEmail(email);
    return user;
  }

  public async create(
    email: string,
    password: string,
    username: string,
  ): Promise<User | null> {
    const user = await this.userRepository.createUser({
      username: username,
      email: email,
      password: password,
    });

    return user;
  }
}
