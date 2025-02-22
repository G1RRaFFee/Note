import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ContactController } from './contact.controller';
// import { SearchController } from './search.controller';
import { ServiceModule } from 'src/core/services/service.module';
import { PROVIDERS } from '../common/constants/provider.constant';
import { ContactService } from 'src/core/services/contact.service';
import { PostgresContactRepository } from '../database/postgres/repositories/contact.repository';
import { FolderController } from './folder.controller';
import { FolderService } from 'src/core/services/folder.service';
import { NotificationController } from './notification.controller';

@Module({
  imports: [ServiceModule],
  providers: [
    FolderService,
    ContactService,
    {
      provide: PROVIDERS.contactRepository,
      useClass: PostgresContactRepository,
    },
  ],
  controllers: [
    ContactController,
    AuthController,
    // SearchController,
    FolderController,
    NotificationController,
  ],
  exports: [ServiceModule],
})
export class ControllersModule {}
