import { Contact } from 'src/core/entities/contact.entity';
import { CreateContactDto } from './dto/createContactDto';
import { UpdateContactDto } from './dto/updateContactDto';
import { Repository } from '../repository';

export interface ContactRepository
  extends Repository<Contact, CreateContactDto, UpdateContactDto> {
  create(dto: CreateContactDto): Promise<Contact>;
  getById(id: number): Promise<Contact>;
  getAll(): Promise<Contact[]>;
  remove(id: number): Promise<Contact>;
  update(id: number, dto: UpdateContactDto): Promise<Contact>;
}
