import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ContactController } from './contact/contact.controller';
import { FileController } from './file/file.controller';

@Module({
  imports: [],
  controllers: [ContactController, AuthController, FileController],
  exports: [],
})
export class ControllersModule {}
