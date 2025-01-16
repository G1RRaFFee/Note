import { Injectable } from '@nestjs/common';

import { Contact } from 'src/core/entities/contact.entity';
import { ContactRepository } from 'src/core/repositories/contact/contact.repository';
import { CreateContactDto } from 'src/core/repositories/contact/dto/createContactDto';
import { UpdateContactDto } from 'src/core/repositories/contact/dto/updateContactDto';
import { PrismaService } from 'src/infrastructure/services/prisma/prisma.service';

@Injectable()
export class PostgresContactRepository implements ContactRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async getContactById(id: number): Promise<Contact | null> {
    const foundContact = await this.prismaService.contact.findUnique({
      where: {
        id: id,
      },
    });
    return foundContact;
  }

  public async getAllContacts(): Promise<Contact[]> {
    const contacts = await this.prismaService.contact.findMany();
    return contacts;
  }

  public async removeContact(id: number): Promise<Contact> {
    const deletedContact = await this.prismaService.contact.delete({
      where: { id: id },
    });
    return deletedContact;
  }

  public async updateContact(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const updatedContact = await this.prismaService.contact.update({
      where: { id: id },
      data: updateContactDto,
    });
    return updatedContact;
  }

  public async createContact(
    createContactDto: CreateContactDto,
  ): Promise<Contact> {
    const newContact = await this.prismaService.contact.create({
      data: createContactDto,
    });

    return newContact;
  }
}
