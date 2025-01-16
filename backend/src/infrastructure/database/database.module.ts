import { Module } from '@nestjs/common';
import { PostgresUserRepository } from './postgres/repositories/user.repository';
import { PrismaModule } from '../services/prisma/prisma.module';
import { PostgresContactRepository } from './postgres/repositories/contact.repository';

@Module({
  imports: [PrismaModule],
  providers: [PostgresUserRepository, PostgresContactRepository],
  exports: [PostgresUserRepository, PostgresContactRepository],
})
export class DatabaseModule {}
