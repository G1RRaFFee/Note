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

  public async getAllWithIdAndNameOnly(): Promise<
    { id: number; name: string }[]
  > {
    return await this.contactRepository.getAllWithIdAndNameOnly();
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
