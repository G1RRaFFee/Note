import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './infrastructure/services/auth/auth.module';
import { ContactController } from './infrastructure/controllers/contact.controller';
import { ServiceModule } from './core/services/service.module';
import { FileController } from './infrastructure/controllers/file.controller';
import { SearchController } from './infrastructure/controllers/search.controller';
import { ContactService } from './core/services/contact.service';
import { PROVIDERS } from './infrastructure/common/constants/provider.constant';
import { PostgresContactRepository } from './infrastructure/database/postgres/repositories/contact.repository';
import { FolderController } from './infrastructure/controllers/folder.controller';
import { NotificationController } from './infrastructure/controllers/notification.controller';
import { NormalizeDataMiddleware } from './infrastructure/middlewares/normalizedData.middleware';

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
  controllers: [
    ContactController,
    FileController,
    SearchController,
    FolderController,
    NotificationController,
  ],
  providers: [
    ContactService,
    {
      provide: PROVIDERS.contactRepository,
      useClass: PostgresContactRepository,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NormalizeDataMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
  }
}
