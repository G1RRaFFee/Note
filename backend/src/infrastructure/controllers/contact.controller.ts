import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/infrastructure/common/guards/auth.guard';
import { ContactService } from 'src/core/services/contact.service';
import { ContactDto } from 'src/core/repositories/contact/dto/contact.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from '../common/decorators/getUser.decorator';
import { ContactMapper } from '../database/mappers/contact.mapper';

@ApiTags('Contact')
@ApiBearerAuth()
@Controller('contacts')
@UseGuards(AuthGuard)
export class ContactController {
  public constructor(private readonly contactService: ContactService) {}

  @ApiOperation({
    summary: 'Get all contacts',
    description: 'Getting all contacts, including pinned contacts and user',
  })
  @ApiBadRequestResponse()
  @ApiOkResponse({
    type: ContactDto.Response.Full.GetAllContacts,
    description: 'The contacts has been successfully received.',
  })
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @Get()
  public async getAllContacts(
    @Query() query: ContactDto.Request.GetContactsQuery,
  ): Promise<ContactDto.Response.Full.GetAllContacts> {
    const contacts = await this.contactService.getAllContacts(
      query.offset,
      query.limit,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: contacts,
    };
  }

  @Get('pinned')
  public async getPinnedContacts(): Promise<ContactDto.Response.Full.getPinnedContacts> {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: await this.contactService.getPinnedContacts(),
    };
  }

  @Get(':id')
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ContactDto.Response.Full.GetContactById> {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: await this.contactService.getContactbyId(id),
    };
  }

  @Post()
  public async createContact(
    @GetUser() user: { id: number },
    @Body() createContactDto: ContactDto.Request.Create,
  ) {
    console.log(createContactDto);
    const mappedContactDto = ContactMapper.toCreateContactDto(
      user,
      createContactDto,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'CREATED.',
      data: await this.contactService.createContact(mappedContactDto),
    };
  }
}
