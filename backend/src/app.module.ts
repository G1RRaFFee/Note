import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/services/auth/auth.module';
import { AppController } from './app.controller';
import { ServiceModule } from './core/services/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    AuthModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
