import { HttpStatus } from '@nestjs/common';
import { ContactService } from 'src/core/services/contact.service';
import { Contact } from 'src/core/entities/contact.entity';
import { CreateContactDto } from 'src/core/repositories/contact/dto/createContactDto';
import { ContactDto } from 'src/core/repositories/contact/dto/contact.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    getAllWithIdAndNameOnly(): Promise<ContactDto.Response.GetAll>;
    getById(id: number): Promise<Contact | null>;
    createContact(user: any, createContactDto: CreateContactDto, avatarUrl?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: Contact;
    }>;
    private handleError;
}
