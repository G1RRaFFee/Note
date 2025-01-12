import { UserRepository } from 'src/core/repositories/user/user.repository';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { User } from 'src/core/entities/user.entity';
import { CreateUserDto } from 'src/core/repositories/user/dto/create.dto';
import { UpdateUserDto } from 'src/core/repositories/user/dto/update.dto';
export declare class PostgresUserRepository implements UserRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getUserById(id: number): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    removeUserById(id: number): Promise<void>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
}
