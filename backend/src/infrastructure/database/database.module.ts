import { Module } from '@nestjs/common';
import { PostgresUserRepository } from './postgres/repositories/user.repository';
import { PrismaModule } from '../services/prisma/prisma.module';
import { PostgresContactRepository } from './postgres/repositories/contact.repository';
import { PostgresFolderRepository } from './postgres/repositories/folder.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    PostgresUserRepository,
    PostgresContactRepository,
    PostgresFolderRepository,
  ],
  exports: [
    PostgresUserRepository,
    PostgresContactRepository,
    PostgresFolderRepository,
  ],
})
export class DatabaseModule {}
