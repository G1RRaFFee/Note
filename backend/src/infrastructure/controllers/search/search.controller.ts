import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from 'src/core/services/search.service';

@Controller('search')
export class SearchController {
  public constructor(private readonly searchService: SearchService<any>) {}

  @Get('contacts')
  public searchContacts(@Query('q') query: string = '') {
    const contacts = [
      {
        id: '1',
        name: 'Иван Иванов',
        email: 'ivan@example.com',
        phone: '+123456789',
      },
      {
        id: '2',
        name: 'Петр Петров',
        email: 'petr@example.com',
        phone: '+987654321',
      },
    ];

    this.searchService.init(
      contacts,
      {
        keys: ['name'],
        threshold: 0.8,
        isCaseSensitive: true,
        ignoreLocation: true,
        minMatchCharLength: 2,
      },
      ['name'],
    );
    return this.searchService.search(query);
  }
}
