// import {
//   Body,
//   Controller,
//   Get,
//   Param,
//   ParseIntPipe,
//   Patch,
//   Post,
// } from '@nestjs/common';
// import { Contact } from 'src/core/entities/contact.entity';
// import { UpdateContactDto } from 'src/core/repositories/ContactRepository/dto/updateContactDto';
// import { ContactService } from 'src/core/services/contact.service';
// import { CreateContactDto } from 'src/core/repositories/ContactRepository/dto/createContactDto';

// @Controller('contacts')
// export class HttpContactController {
//   constructor(private readonly contactService: ContactService) {}

//   @Post()
//   async createContact(@Body() createContactDto: CreateContactDto) {
//     return this.contactService.createContact(createContactDto);
//   }

//   @Get()
//   async getAllContacts(): Promise<Contact[]> {
//     return await this.contactService.getAllContacts();
//   }

//   @Patch(':id')
//   async updateContact(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() updateContactDto: UpdateContactDto,
//   ) {
//     return await this.contactService.updateContact(id, updateContactDto);
//   }
// }
