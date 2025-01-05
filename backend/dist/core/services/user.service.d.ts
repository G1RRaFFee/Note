import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { User } from '@prisma/client';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(email: string, password: string, username: string): Promise<User | null>;
}
