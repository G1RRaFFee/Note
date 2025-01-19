import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/infrastructure/common/guards/auth.guard';
import { ContactService } from 'src/core/services/contact.service';
import { Contact } from 'src/core/entities/contact.entity';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import fileOptions from 'src/infrastructure/config/file/file.config';
import { existsSync } from 'fs';
import { join } from 'path';
import { CreateContactDto } from 'src/core/repositories/contact/dto/createContactDto';
import { User } from 'src/infrastructure/common/decorators/extract.user';

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

  // @Get('avatar/:filename')
  // getAvatar(@Param('filename') filename: string, @Res() res: Response) {
  //   console.log(filename);
  //   const filePath = join(process.cwd(), '..', 'uploads', filename);
  //   // Проверяем, существует ли файл
  //   if (!existsSync(filePath)) {
  //     return res.status(404).send('File not found');
  //   }

  //   // Отправляем файл в ответе
  //   return res.sendFile(filePath);
  // }
}
