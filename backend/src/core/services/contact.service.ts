import { Inject, Injectable, NotFoundException } from '@nestjs/common';

// import Fuse from 'fuse.js';

import { Contact } from '../entities/contact.entity';
import { ContactRepository } from '../repositories/contact/contact.repository';
import { UpdateContactDto } from '../repositories/contact/dto/updateContactDto';
import { CreateContactDto } from '../repositories/contact/dto/createContactDto';

// import {
//   TRANSLIT_MAP,
//   REVERSE_TRANSLIT_MAP,
// } from 'src/infrastructure/common/constants/contacts/contact.constant';

@Injectable()
export class ContactService {
  private contacts = [{ id: 1, name: 'Alex', about: 'Friend' }];

  public constructor(
    @Inject('ContactRepository')
    private readonly contactRepository: ContactRepository,
  ) {}

  // private transliterate(str: string, reverse = false): string {
  //   const map = reverse ? REVERSE_TRANSLIT_MAP : TRANSLIT_MAP;
  //   return str
  //     .split('')
  //     .map((char) => map[char.toLowerCase()] || char)
  //     .join('');
  // }

  // public async searchContacts(query: string) {
  //   if (!query) return this.contacts;

  //   const translitQuery = this.transliterate(query);
  //   const fuse = new Fuse(this.contacts, {
  //     keys: ['name', 'about'],
  //     threshold: 0.3,
  //     ignoreLocation: true,
  //     isCaseSensitive: false,
  //   });

  //   const results = [...fuse.search(query), ...fuse.search(translitQuery)];

  //   // Убираем дубликаты, используя Map (уникальный `id`)
  //   const uniqueResults = new Map();
  //   results.forEach((result) => {
  //     uniqueResults.set(result.item.id, result.item);
  //   });

  //   return Array.from(uniqueResults.values());
  // }

  public async createContact(createContactDto: CreateContactDto) {
    return await this.contactRepository.createContact(createContactDto);
  }

  public async getPaginatedContacts(
    page: number,
    perPage: number,
    order?: 'asc' | 'desc',
  ): Promise<{
    paginationDetails: {
      currentPage: number;
      perPage: number;
      totalContacts: number;
      totalPages: number;
    };
    contacts: {
      id: number;
      name: string;
    }[];
  }> {
    const totalContacts = await this.contactRepository.getTotalContacts();
    const totalPages = Math.ceil(totalContacts / perPage);
    const contacts = await this.contactRepository.getPaginatedContacts(
      page,
      perPage,
      order,
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

  public async updateContact(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const contact = await this.contactRepository.getContactById(id);

    if (!contact)
      throw new NotFoundException(`Contact with ID ${id} not found`);

    return await this.contactRepository.updateContact(id, updateContactDto);
  }

  public async getContactbyId(id: number): Promise<Contact | null> {
    const contact = await this.contactRepository.getContactById(id);
    if (!contact) return null;
    return contact;
  }
}
