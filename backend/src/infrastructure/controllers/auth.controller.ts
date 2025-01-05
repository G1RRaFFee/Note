// import {
//   Body,
//   Controller,
//   HttpCode,
//   HttpStatus,
//   Post,
//   UseGuards,
// } from '@nestjs/common';
// import { RegisterDto } from 'src/core/repositories/AuthRepository/dto/register.dto';
// import { AuthService } from 'src/core/services/auth.service';
// import { RefreshTokenGuard } from 'src/core/services/refresh.guard';

// @Controller('auth')
// export class AuthController {
//   public constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   @HttpCode(HttpStatus.OK)
//   public async register(@Body() dto: RegisterDto) {
//     // return await this.authService.register(dto);
//   }
//   @HttpCode(HttpStatus.OK)
//   @Post('login')
//   public async signIn(@Body signInDto: Record<string, any>) {
//     const user = this.authService.validateUser(
//       signInDto.email,
//       signInDto.password,
//     );

//     if (!user) {
//       throw new Error('Invalid credentials');
//     }

//     return this.authService.generateTokens(user);
//   }

//   @Post('refresh')
//   @UseGuards(RefreshTokenGuard)
//   async refresh(@Body('refreshToken') refreshToken: string) {
//     return this.authService.refreshTokens(refreshToken);
//   }
// }
