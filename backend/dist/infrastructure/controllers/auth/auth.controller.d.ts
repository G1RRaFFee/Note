import { AuthService } from '../../services/auth/auth.service';
import { SignUpDto } from '../../../core/repositories/auth/dto/signup.dto';
import { SignInDto } from '../../../core/repositories/auth/dto/signin.dto';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    signIn(signInDto: SignInDto, response: Response): Promise<{
        accessToken: string;
    }>;
    refreshToken(request: Request, response: Response): Promise<{
        accessToken: string;
    }>;
    logout(request: Request, response: Response): Promise<{
        id: number;
        createdAt: Date;
        token: string;
        expiresAt: Date;
        userId: number;
    }>;
}
