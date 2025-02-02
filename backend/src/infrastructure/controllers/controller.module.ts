import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ContactController } from './contact/contact.controller';
import { FileController } from './file/file.controller';
import { SearchController } from './search/search.controller';

@Module({
  imports: [],
  controllers: [
    ContactController,
    AuthController,
    FileController,
    SearchController,
  ],
  exports: [],
})
export class ControllersModule {}
