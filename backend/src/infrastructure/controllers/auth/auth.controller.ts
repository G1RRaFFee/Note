import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Req,
  UnauthorizedException,
  Get,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { SignUpDto } from '../../../core/repositories/auth/dto/signup.dto';
import { SignInDto } from '../../../core/repositories/auth/dto/signin.dto';
import { Response, Request } from 'express';
import { GetUser } from 'src/infrastructure/common/decorators/getUser.decorator';
import { AuthGuard } from 'src/infrastructure/common/guards/auth.guard';
import { UserService } from 'src/core/services/user.service';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('me')
  public async getMe(@GetUser('id', ParseIntPipe) userId: number) {
    const user = await this.userService.findById(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: user,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  public async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  public async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 30 * 24 * 60 * 60 * 1000,
    });

    return {
      codeStatus: HttpStatus.OK,
      message: 'User successfully signIn',
      data: {
        accessToken,
        user,
      },
    };
  }

  @Post('refresh')
  public async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
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
