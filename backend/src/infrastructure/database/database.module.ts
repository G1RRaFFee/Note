import { Module } from '@nestjs/common';
import { PostgresUserRepository } from './postgres/repositories/user.repository';
import { PrismaModule } from '../services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PostgresUserRepository],
  exports: [PostgresUserRepository],
})
export class DatabaseModule {}
