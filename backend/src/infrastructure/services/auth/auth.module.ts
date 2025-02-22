import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from '../../controllers/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { ServiceModule } from 'src/core/services/service.module';
import { JwtStrategyModule } from '../jwt/jwt.module';

@Module({
  imports: [JwtStrategyModule, PrismaModule, ServiceModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
