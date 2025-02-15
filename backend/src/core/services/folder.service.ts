import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PostgresContactRepository } from 'src/infrastructure/database/postgres/repositories/contact.repository';
import { PostgresFolderRepository } from 'src/infrastructure/database/postgres/repositories/folder.repository';

@Injectable()
export class FolderService implements OnModuleInit {
  public constructor(
    @Inject('ContactRepository')
    private readonly contactRepository: PostgresContactRepository,
    @Inject('FolderRepository')
    private readonly folderRepository: PostgresFolderRepository,
  ) {}

  public onModuleInit(): void {
    this.checkReservedFolder();
  }

  public async getAllFolders() {
    return await this.folderRepository.getAllFolders();
  }

  public async getAllContactsFromFolder(
    folderId: number,
    page: number = 1,
    perPage: number = 10,
  ) {
    const totalContacts =
      await this.contactRepository.getTotalContactsFromFolder(folderId);
    const totalPages = Math.ceil(totalContacts / perPage);
    const folder = await this.folderRepository.getFolderById(folderId);

    if (folder.isReserved) {
      return this.contactRepository.getAllPaginated(page, perPage);
    }
    // TODO: Переписать получение всех пользователей
    const { contacts } = await this.folderRepository.getAllContactsFromFolder(
      folderId,
      page,
      perPage,
    );
    return {
      paginationDetails: {
        currentPage: page,
        perPage,
        totalContacts,
        totalPages,
      },
      contacts: contacts,
    };
  }

  private async checkReservedFolder() {
    const existingFolder = await this.folderRepository.getReservedFolder();
    if (!existingFolder) {
      await this.folderRepository.createFolder('Все', true);
    }
  }
}
