import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/infrastructure/common/guards/auth.guard';
import { ContactService } from 'src/core/services/contact.service';
import { Contact } from 'src/core/entities/contact.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import fileOptions from 'src/infrastructure/config/file/file.config';
import { CreateContactDto } from 'src/core/repositories/contact/dto/createContactDto';
import { User } from 'src/infrastructure/common/decorators/extract.user';
import { ContactDto } from 'src/core/repositories/contact/dto/contact.dto';

@Controller('contacts')
@UseGuards(AuthGuard)
export class ContactController {
  public constructor(private readonly contactService: ContactService) {}

  @Get()
  public async getPaginatedContacts(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('per_page', ParseIntPipe) perPage: number = 10,
  ): Promise<ContactDto.Response.GetPaginatedContacts> {
    const contacts = await this.contactService.getPaginatedContacts(
      page,
      perPage,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Contacts successfully received',
      data: contacts,
    };
  }

  @Get(':id')
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Contact | null> {
    return await this.contactService.getContactbyId(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatarUrl', fileOptions))
  public async createContact(
    @User() user,
    @Body() createContactDto: CreateContactDto,
    @UploadedFile() avatarUrl?: Express.Multer.File,
  ) {
    try {
      createContactDto.userId = user.id;

      if (avatarUrl) {
        createContactDto.avatarUrl = `uploads/${avatarUrl.filename}`;
      }

      const contact = await this.contactService.createContact(createContactDto);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Contact successfully created.',
        data: contact,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        { message: 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
