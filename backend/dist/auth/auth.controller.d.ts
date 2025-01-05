import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { RefreshTokenDto } from './dto/refresh.dto';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<{
        username: string;
        email: string;
        password: string;
        id: number;
        createdAt: Date;
        updateAt: Date;
    }>;
    signIn(signInDto: SignInDto, response: Response): Promise<{
        accessToken: string;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto, response: Response): Promise<{
        accessToken: string;
    }>;
    logout(request: Request, response: Response): Promise<{
        token: string;
        id: number;
        createdAt: Date;
        expiresAt: Date;
        userId: number;
    }>;
}
