import { Module } from '@nestjs/common';
import { PostgresUserRepository } from './postgres/repositories/user.repository';
import { PrismaModule } from '../services/prisma/prisma.module';
import { PostgresContactRepository } from './postgres/repositories/contact.repository';
// import { PostgresRepository } from './postgres/repositories/repository';

@Module({
  imports: [PrismaModule],
  providers: [
    PostgresUserRepository,
    PostgresContactRepository,
    // PostgresRepository,
  ],
  exports: [
    PostgresUserRepository,
    PostgresContactRepository,
    // PostgresRepository,
  ],
})
export class DatabaseModule {}
