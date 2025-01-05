// import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { Contact } from '../entities/contact.entity';
// import { ContactRepository } from '../repositories/ContactRepository/contact.repository';
// import { UpdateContactDto } from '../repositories/ContactRepository/dto/updateContactDto';
// import { CreateContactDto } from '../repositories/ContactRepository/dto/createContactDto';

// @Injectable()
// export class ContactService {
//   constructor(
//     @Inject('ContactRepository')
//     private readonly contactRepository: ContactRepository,
//   ) {}

//   async createContact(dto: CreateContactDto): Promise<Contact> {
//     return await this.contactRepository.create(dto);
//   }

//   async getAllContacts(): Promise<Contact[]> {
//     return await this.contactRepository.getAll();
//   }

//   async updateContact(id: number, dto: UpdateContactDto): Promise<Contact> {
//     const contact = await this.contactRepository.getById(id);
//     if (!contact)
//       throw new NotFoundException(`Contact with ID ${id} not found`);

//     return await this.contactRepository.update(id, dto);
//   }
// }
