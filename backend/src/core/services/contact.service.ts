import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Contact } from '../entities/contact.entity';
// import { Repository } from '../repositories/repository/repository';
import { PROVIDERS } from 'src/infrastructure/common/constants/provider.constant';
import { ContactDto } from '../repositories/contact/dto/contact.dto';
import { PostgresContactRepository } from 'src/infrastructure/database/postgres/repositories/contact.repository';

@Injectable()
export class ContactService {
  public constructor(
    @Inject(PROVIDERS.contactRepository)
    private readonly contactRepository: PostgresContactRepository,
  ) {}

  public async createContact(createContactDto) {
    return await this.contactRepository.create(createContactDto);
  }
  public async getPinnedContacts() {
    return await this.contactRepository.getPinnedContacts();
  }

  public async getAllContacts(
    page: number,
    perPage: number,
  ): Promise<ContactDto.Response.Basic.GetPaginatedContacts> {
    const totalContacts = await this.contactRepository.getTotalCounts();
    const totalPages = Math.ceil(totalContacts / perPage);
    const contacts = await this.contactRepository.getAllContacts(page, perPage);

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

  public async updateContact(id: number, updateContactDto): Promise<Contact> {
    const contact = await this.contactRepository.getById(id);

    if (!contact)
      throw new NotFoundException(`Contact with ID ${id} not found`);

    return await this.contactRepository.update(id, updateContactDto);
  }

  public async getContactbyId(id: number): Promise<Contact | null> {
    // переписать, оставив проверку, но возвращая 204 статус
    const contact = await this.contactRepository.getById(id);
    if (!contact) return null;
    return contact;
  }
}
