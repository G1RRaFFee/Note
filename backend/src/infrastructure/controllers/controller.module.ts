import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ContactController } from './contact/contact.controller';
import { FileController } from './file/file.controller';
import { SearchController } from './search/search.controller';
import { ServiceModule } from 'src/core/services/service.module';
import { PROVIDERS } from '../common/constants/provider.constant';
import { ContactService } from 'src/core/services/contact.service';
import { PostgresContactRepository } from '../database/postgres/repositories/contact.repository';

@Module({
  imports: [ServiceModule],
  providers: [
    ContactService,
    {
      provide: PROVIDERS.contactRepository,
      useClass: PostgresContactRepository,
    },
  ],
  controllers: [
    ContactController,
    AuthController,
    FileController,
    SearchController,
  ],
  exports: [ServiceModule],
})
export class ControllersModule {}
