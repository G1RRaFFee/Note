import { Contact } from '../entities/contact.entity';
import { ContactRepository } from '../repositories/contact/contact.repository';
import { CreateContactDto } from '../repositories/contact/dto/createContactDto';
import { UpdateContactDto } from '../repositories/contact/dto/updateContactDto';
export declare class ContactService {
    private readonly contactRepository;
    constructor(contactRepository: ContactRepository);
    createContact(createContactDto: CreateContactDto): Promise<Contact>;
    getAllContacts(): Promise<Contact[]>;
    updateContact(id: number, updateContactDto: UpdateContactDto): Promise<Contact>;
    getContactbyId(id: number): Promise<Contact | null>;
}
