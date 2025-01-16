import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PostgresUserRepository } from 'src/infrastructure/database/postgres/repositories/user.repository';
import { ContactService } from './contact.service';
import { PostgresContactRepository } from 'src/infrastructure/database/postgres/repositories/contact.repository';

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
  ],
  exports: [UserService, ContactService],
})
export class ServiceModule {}
