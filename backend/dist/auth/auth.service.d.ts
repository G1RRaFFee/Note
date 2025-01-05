import { SignUpDto } from './dto/signup.dto';
import { UserService } from 'src/core/services/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
export declare class AuthService {
    private readonly prismaService;
    private readonly userService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, userService: UserService, jwtService: JwtService);
    signUp(signUpData: SignUpDto): Promise<User | null>;
    signIn(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateTokens(userId: number): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    saveRefreshToken(userId: number, token: string): Promise<void>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<{
        token: string;
        id: number;
        createdAt: Date;
        expiresAt: Date;
        userId: number;
    }>;
}
