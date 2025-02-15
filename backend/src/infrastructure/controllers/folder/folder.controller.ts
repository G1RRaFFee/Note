import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Contact } from 'src/core/entities/contact.entity';
import { FolderService } from 'src/core/services/folder.service';

@Controller('folders')
export class FolderController {
  public constructor(private readonly folderSerivce: FolderService) {}

  @Get()
  public async getAllFolders() {
    const folders = await this.folderSerivce.getAllFolders();

    return {
      statusCode: HttpStatus.OK,
      message: 'Folders successfully received',
      data: folders,
    };
  }

  @Get(':folderId')
  public async getAllContactsFromFolder(
    @Param('folderId', ParseIntPipe) folderId: number,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('per_page', ParseIntPipe) perPage: number = 10,
  ) {
    const contactsFromFolder =
      await this.folderSerivce.getAllContactsFromFolder(
        folderId,
        page,
        perPage,
      );

    return {
      statusCode: HttpStatus.OK,
      message: 'Contacts from folder successfully received',
      data: contactsFromFolder,
    };
  }
}
