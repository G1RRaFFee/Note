import { User } from 'src/core/entities/user.entity';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';

export interface UserRepository {
  getUserById(id: number);
  getUserByEmail(email: string);
  createUser(creatUserDto: CreateUserDto): Promise<User>;
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
  removeUserById(id: number): Promise<void>;
}
