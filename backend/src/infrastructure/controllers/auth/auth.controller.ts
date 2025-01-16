import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { SignUpDto } from '../../../core/repositories/auth/dto/signup.dto';
import { SignInDto } from '../../../core/repositories/auth/dto/signin.dto';
import { RefreshTokenDto } from '../../../core/repositories/auth/dto/refresh.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  public async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  public async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 30 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @Post('refresh')
  public async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('Все cookie: ', request.cookies);
    if (!request.cookies['refreshToken']) {
      throw new UnauthorizedException('Refresh Token is missing');
    }
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      request.cookies['refreshToken'],
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    });

    return { accessToken };
  }

  @Post('logout')
  public async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = request.cookies;
    response.clearCookie('refreshToken');
    return await this.authService.logout(refreshToken);
  }
}
