import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Contact } from '../entities/contact.entity';
import { ContactRepository } from '../repositories/contact/contact.repository';
import { UpdateContactDto } from '../repositories/contact/dto/updateContactDto';
import { CreateContactDto } from '../repositories/contact/dto/createContactDto';

@Injectable()
export class ContactService {
  public constructor(
    @Inject('ContactRepository')
    private readonly contactRepository: ContactRepository,
  ) {}

  public async createContact(createContactDto: CreateContactDto) {
    return await this.contactRepository.createContact(createContactDto);
  }
  public async getPaginatedContacts(
    page: number,
    perPage: number,
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
