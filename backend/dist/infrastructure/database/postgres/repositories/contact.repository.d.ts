import { Contact } from 'src/core/entities/contact.entity';
import { ContactRepository } from 'src/core/repositories/contact/contact.repository';
import { CreateContactDto } from 'src/core/repositories/contact/dto/createContactDto';
import { UpdateContactDto } from 'src/core/repositories/contact/dto/updateContactDto';
import { PrismaService } from 'src/infrastructure/services/prisma/prisma.service';
export declare class PostgresContactRepository implements ContactRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getContactById(id: number): Promise<Contact | null>;
    getAllContacts(): Promise<Contact[]>;
    removeContact(id: number): Promise<Contact>;
    updateContact(id: number, updateContactDto: UpdateContactDto): Promise<Contact>;
    createContact(createContactDto: CreateContactDto): Promise<Contact>;
}
