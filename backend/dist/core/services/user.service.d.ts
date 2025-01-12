import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user/user.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(email: string, password: string, username: string): Promise<User | null>;
}
