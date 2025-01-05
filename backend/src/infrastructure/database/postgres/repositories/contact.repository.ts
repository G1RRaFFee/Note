// // TODO: Переписать с использованием Mapper
// import { Injectable } from '@nestjs/common';
// import { ContactRepository } from 'src/core/repositories/ContactRepository/contact.repository';
// import { PrismaService } from '../../prisma.service';
// import { Contact } from 'src/core/entities/contact.entity';
// import { Prisma } from '@prisma/client';

// @Injectable()
// export class PostgresContactRepository implements ContactRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   async getById(id: number): Promise<Contact | null> {
//     const foundContact = await this.prisma.contact.findUnique({
//       where: {
//         id: id,
//       },
//     });
//     return foundContact;
//   }

//   async getAll(): Promise<Contact[]> {
//     const contacts = await this.prisma.contact.findMany();
//     return contacts;
//   }

//   async remove(id: number): Promise<Contact> {
//     const deletedContact = await this.prisma.contact.delete({
//       where: { id: id },
//     });
//     return deletedContact;
//   }

//   async update(id: number, dto: Prisma.ContactUpdateInput): Promise<Contact> {
//     const updatedContact = await this.prisma.contact.update({
//       where: { id: id },
//       data: dto,
//     });
//     return updatedContact;
//   }

//   async create(dto: Prisma.ContactCreateInput): Promise<Contact> {
//     const newContact = await this.prisma.contact.create({
//       data: dto,
//     });

//     return newContact;
//   }
// }
