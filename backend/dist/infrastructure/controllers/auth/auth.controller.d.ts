import { AuthService } from '../../services/auth/auth.service';
import { SignUpDto } from '../../../core/repositories/auth/dto/signup.dto';
import { SignInDto } from '../../../core/repositories/auth/dto/signin.dto';
import { RefreshTokenDto } from '../../../core/repositories/auth/dto/refresh.dto';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<{
        id: number;
        createdAt: Date;
        username: string;
        email: string;
        password: string;
        updatedAt: Date;
    }>;
    signIn(signInDto: SignInDto, response: Response): Promise<{
        accessToken: string;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto, response: Response): Promise<{
        accessToken: string;
    }>;
    logout(request: Request, response: Response): Promise<{
        id: number;
        token: string;
        expiresAt: Date;
        createdAt: Date;
        userId: number;
    }>;
}
