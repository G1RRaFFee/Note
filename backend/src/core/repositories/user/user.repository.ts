import { User } from 'src/core/entities/user.entity';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';

export interface UserRepository {
  getUserById(id: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(creatUserDto: CreateUserDto): Promise<User>;
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
  removeUserById(id: number): Promise<void>;
}
