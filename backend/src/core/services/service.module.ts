import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PostgresUserRepository } from 'src/infrastructure/database/postgres/repositories/user.repository';
import { ContactService } from './contact.service';
import { PostgresContactRepository } from 'src/infrastructure/database/postgres/repositories/contact.repository';
// import { SearchService } from './search.service';
import { PROVIDERS } from 'src/infrastructure/common/constants/provider.constant';
// import { PostgresRepository } from 'src/infrastructure/database/postgres/repositories/base.repository';
import { FolderService } from './folder.service';
import { PostgresFolderRepository } from 'src/infrastructure/database/postgres/repositories/folder.repository';
import { NotificationService } from './notification.service';

@Module({
  providers: [
    NotificationService,
    FolderService,
    {
      provide: PROVIDERS.folderRepository,
      useClass: PostgresFolderRepository,
    },
    UserService,
    {
      provide: PROVIDERS.userRepository,
      useClass: PostgresUserRepository,
    },
    ContactService,
    {
      provide: PROVIDERS.contactRepository,
      useClass: PostgresContactRepository,
    },
    // SearchService,
    // {
    //   provide: PROVIDERS.repository,
    //   useClass: PostgresRepository,
    // },
  ],
  exports: [
    UserService,
    ContactService,
    // SearchService,
    FolderService,
    NotificationService,
  ],
})
export class ServiceModule {}
