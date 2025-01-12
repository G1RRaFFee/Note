import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PostgresUserRepository } from 'src/infrastructure/database/postgres/repositories/user.repository';

@Module({
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: PostgresUserRepository,
    },
  ],
  exports: [UserService],
})
export class ServiceModule {}
