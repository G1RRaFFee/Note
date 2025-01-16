import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/infrastructure/common/guards/auth.guard';
import { ContactService } from 'src/core/services/contact.service';
import { Contact } from 'src/core/entities/contact.entity';

@Controller('contacts')
@UseGuards(AuthGuard)
export class ContactController {
  public constructor(private readonly contactService: ContactService) {}

  @Get()
  public async getAll(): Promise<Contact[]> {
    return await this.contactService.getAllContacts();
  }

  @Get(':id')
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Contact | null> {
    return await this.contactService.getContactbyId(id);
  }
}
