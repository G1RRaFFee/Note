import { ContactService } from 'src/core/services/contact.service';
import { Contact } from 'src/core/entities/contact.entity';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    getAll(): Promise<Contact[]>;
    getById(id: number): Promise<Contact | null>;
}
