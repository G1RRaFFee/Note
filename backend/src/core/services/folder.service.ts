import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PROVIDERS } from 'src/infrastructure/common/constants/provider.constant';
import { PostgresContactRepository } from 'src/infrastructure/database/postgres/repositories/contact.repository';
import { PostgresFolderRepository } from 'src/infrastructure/database/postgres/repositories/folder.repository';
import { PostgresUserRepository } from 'src/infrastructure/database/postgres/repositories/user.repository';

@Injectable()
export class FolderService implements OnModuleInit {
  public constructor(
    @Inject(PROVIDERS.userRepository)
    private readonly userRepository: PostgresUserRepository,
    @Inject(PROVIDERS.contactRepository)
    private readonly contactRepository: PostgresContactRepository,
    @Inject(PROVIDERS.folderRepository)
    private readonly folderRepository: PostgresFolderRepository,
  ) {}

  public onModuleInit(): void {
    this.checkReservedFolder();
  }

  public async getAllFolders() {
    return await this.folderRepository.getAllFolders();
  }

  public getAllPinnedContactsFromFolder(folderId: number) {
    return this.folderRepository.getAllPinnedContactsFromFolder(folderId);
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

    const pinnedContacts = await this.getAllPinnedContactsFromFolder(folderId);

    if (folder.isReserved) {
      const reservedFolder = await this.folderRepository.getReservedFolder();
      const user = await this.userRepository.getUserByReservedFolder(
        reservedFolder.id,
      );
      return {
        user: user,
        contacts: {
          paginationDetails: {
            currentPage: page,
            perPage,
            totalContacts,
            totalPages,
          },
          data: await this.contactRepository.getAllContacts(page, perPage),
        },
        pinnedContacts: pinnedContacts,
      };
    }

    const { contacts } = await this.folderRepository.getAllContactsFromFolder(
      folderId,
      page,
      perPage,
    );

    return {
      contacts: {
        paginationDetails: {
          currentPage: page,
          perPage,
          totalContacts,
          totalPages,
        },
        data: contacts,
      },
      pinnedContacts: pinnedContacts,
    };
  }

  private async checkReservedFolder() {
    const existingFolder = await this.folderRepository.getReservedFolder();
    if (!existingFolder) {
      await this.folderRepository.createFolder('Все', true);
    }
  }
}
