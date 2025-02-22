import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common';
import { Contact } from 'src/core/entities/contact.entity';
import { ContactDto } from 'src/core/repositories/contact/dto/contact.dto';
import { Repository } from 'src/core/repositories/repository/repository';
import { SearchService } from 'src/core/services/search.service';
import { PROVIDERS } from 'src/infrastructure/common/constants/provider.constant';

@Controller('search')
export class SearchController {
  private contactSearchService: SearchService<Contact>;

  public constructor(
    @Inject(PROVIDERS.contactRepository)
    private readonly contactRepository: Repository<Contact>,
  ) {
    this.contactSearchService = new SearchService<Contact>(
      this.contactRepository,
    );
    // TODO: "Поиск ищет только среди contacts, не pinnedContacts"
    this.contactSearchService.init({
      keys: ['firstName', 'lastName', 'middleName'],
      threshold: 0.6,
      isCaseSensitive: false,
      ignoreLocation: true,
      minMatchCharLength: 1,
    });
  }

  @Get('contacts')
  public async searchContacts(
    @Query('q') query: string,
  ): Promise<ContactDto.Response.Full.SearchContacts> {
    if (!query) {
      throw new BadRequestException('Query missing');
    }
    const result = await this.contactSearchService.search(query);
    return {
      statusCode: HttpStatus.OK,
      message: 'Сontact(s) successfully found',
      data: {
        contacts: result,
      },
    };
  }
}
