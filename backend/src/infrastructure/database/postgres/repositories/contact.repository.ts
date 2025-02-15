import { Injectable } from '@nestjs/common';

import { Contact } from 'src/core/entities/contact.entity';
import { Repository } from 'src/core/repositories/repository/repository';
import { PrismaService } from 'src/infrastructure/services/prisma/prisma.service';

@Injectable()
export class PostgresContactRepository implements Repository<Contact> {
  public constructor(private readonly prismaService: PrismaService) {}

  public async getAll(sort?: {
    field: keyof Contact;
    orderBy: 'asc' | 'desc';
  }): Promise<Contact[]> {
    return await this.prismaService.contact.findMany({
      ...(sort ? { orderBy: { [sort.field]: sort.orderBy } } : {}),
    });
  }

  public async getAllWithFields<K extends keyof Contact>(
    fields: K[],
    sort?: {
      field: keyof Contact;
      orderBy: 'asc' | 'desc';
    },
  ): Promise<Pick<Contact, K>[]> {
    return (await this.prismaService.contact.findMany({
      select: fields.reduce(
        (accumulator, field) => ({ ...accumulator, [field]: true }),
        {},
      ),
      ...(sort ? { orderBy: { [sort.field]: sort.orderBy } } : {}),
    })) as Pick<Contact, K>[];
  }

  public async getById(id: number) {
    return await this.prismaService.contact.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        middleName: true,
        email: true,
        avatarUrl: true,
        phone: true,
        birthday: true,
        about: true,
      },
    });
  }

  public async remove(id: number): Promise<void> {
    await this.prismaService.contact.delete({
      where: { id: id },
    });
  }

  public async getTotalContactsFromFolder(folderId: number) {
    return await this.prismaService.contact.count({
      where: {
        folderId: folderId,
      },
    });
  }

  public async update(id: number, updateContactDto): Promise<Contact> {
    const updatedContact = await this.prismaService.contact.update({
      where: { id: id },
      data: updateContactDto,
    });
    return updatedContact;
  }

  public async create(createContactDto): Promise<Contact> {
    return;
    // return await this.prismaService.contact.create({
    //   data: createContactDto,
    // });
  }

  public async getTotalCounts(): Promise<number> {
    return await this.prismaService.contact.count();
  }

  public async getAllPaginated(
    page: number = 1,
    perPage: number = 10,
    sort?: {
      field: keyof Contact;
      orderBy: 'asc' | 'desc';
    },
  ) {
    return await this.prismaService.contact.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        middleName: true,
        about: true,
      },
      orderBy: {
        [sort.field]: sort.orderBy,
      },
    });
  }

  public async getPinnedContacts() {
    return await this.prismaService.contact.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        middleName: true,
        about: true,
      },
      where: {
        isPinned: true,
      },
    });
  }
}
