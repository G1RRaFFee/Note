// import { Module } from '@nestjs/common';
// import { PrismaService } from 'src/infrastructure/database/prisma.service'; // Путь к вашему PrismaService
// import { ContactService } from './contact.service';
// import { PostgresContactRepository } from 'src/infrastructure/database/postgres/repositories/contact.repository';
// import { HttpContactController } from 'src/infrastructure/controllers/http.contact.controller';

// @Module({
//   controllers: [HttpContactController],
//   providers: [
//     PrismaService,
//     ContactService,
//     {
//       provide: 'ContactRepository',
//       useClass: PostgresContactRepository,
//     },
//   ],
//   exports: [ContactService],
// })
// export class ContactModule {}
