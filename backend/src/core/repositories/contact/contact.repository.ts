import { Contact } from 'src/core/entities/contact.entity';
import { CreateContactDto } from './dto/createContactDto';
import { UpdateContactDto } from './dto/updateContactDto';

export interface ContactRepository {
  createContact(createContactDto: CreateContactDto): Promise<Contact>;
  getContactById(id: number): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  removeContact(id: number): Promise<Contact>;
  updateContact(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact>;
}
