import { Contact } from '../entities/contact.entity';
import { ContactRepository } from '../repositories/contact/contact.repository';
import { UpdateContactDto } from '../repositories/contact/dto/updateContactDto';
import { CreateContactDto } from '../repositories/contact/dto/createContactDto';
export declare class ContactService {
    private readonly contactRepository;
    constructor(contactRepository: ContactRepository);
    createContact(createContactDto: CreateContactDto): Promise<Contact>;
    getAllWithIdAndNameOnly(): Promise<{
        id: number;
        name: string;
    }[]>;
    updateContact(id: number, updateContactDto: UpdateContactDto): Promise<Contact>;
    getContactbyId(id: number): Promise<Contact | null>;
}
