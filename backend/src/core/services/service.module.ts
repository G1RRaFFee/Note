import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PostgresUserRepository } from 'src/infrastructure/database/postgres/repositories/user.repository';
import { ContactService } from './contact.service';
import { PostgresContactRepository } from 'src/infrastructure/database/postgres/repositories/contact.repository';
import { SearchService } from './search.service';

@Module({
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: PostgresUserRepository,
    },
    ContactService,
    {
      provide: 'ContactRepository',
      useClass: PostgresContactRepository,
    },
    SearchService,
  ],
  exports: [UserService, ContactService, SearchService],
})
export class ServiceModule {}
