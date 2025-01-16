import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/services/auth/auth.module';
import { ServiceModule } from './core/services/service.module';
import { ContactController } from './infrastructure/controllers/contact/contact.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    AuthModule,
    ServiceModule,
  ],
  controllers: [ContactController],
  providers: [],
})
export class AppModule {}
