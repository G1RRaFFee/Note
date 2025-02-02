import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './infrastructure/services/auth/auth.module';
import { ContactController } from './infrastructure/controllers/contact/contact.controller';
import { ServiceModule } from './core/services/service.module';
import { FileController } from './infrastructure/controllers/file/file.controller';
import { SearchController } from './infrastructure/controllers/search/search.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    AuthModule,
    ServiceModule,
  ],
  controllers: [ContactController, FileController, SearchController],
  providers: [],
})
export class AppModule {}
