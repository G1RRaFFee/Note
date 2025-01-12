import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ContactController } from './contact/contact.controller';

@Module({
  imports: [],
  controllers: [ContactController, AuthController],
})
export class ControllersModule {}
