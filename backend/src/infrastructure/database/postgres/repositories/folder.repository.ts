import { Injectable } from '@nestjs/common';
import { Contact } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/services/prisma/prisma.service';

@Injectable()
export class PostgresFolderRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async getFolderById(id: number) {
    return await this.prismaService.folder.findFirst({ where: { id: id } });
  }

  public async getAllFolders() {
    return await this.prismaService.folder.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  public async getAllContactsFromFolder(
    folderId: number,
    page: number = 1,
    perPage: number = 10,
  ) {
    return await this.prismaService.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        contacts: {
          take: perPage,
          skip: (page - 1) * perPage,
          orderBy: { middleName: 'asc' },
        },
      },
    });
  }

  public async getReservedFolder() {
    return await this.prismaService.folder.findFirst({
      where: {
        isReserved: true,
      },
    });
  }

  public async createFolder(name: string, isReserved: boolean) {
    await this.prismaService.folder.create({
      data: { name: name, isReserved: isReserved },
    });
  }
}
