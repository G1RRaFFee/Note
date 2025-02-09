import { Inject, Injectable } from '@nestjs/common';
import Fuse, { FuseResult, IFuseOptions } from 'fuse.js';
import {
  convertCyrillicToLatin,
  convertLatinToCyrillic,
  detectLanguage,
} from 'src/infrastructure/helpers/search.helper';
import { Repository } from '../repositories/repository/repository';
import { PROVIDERS } from 'src/infrastructure/common/constants/provider.constant';

@Injectable()
export class SearchService<T> {
  private cache: T[] = [];
  private fuse: Fuse<T>;
  private options: IFuseOptions<T>;

  public constructor(
    @Inject(PROVIDERS.repository)
    private readonly repository: Repository<T>,
  ) {}

  public async refreshCache(): Promise<void> {
    this.cache = await this.repository.getAll();
    if (this.options) {
      this.fuse = new Fuse(this.cache, this.options);
    }
  }

  public init(options: IFuseOptions<T>): void {
    this.options = options;
    this.fuse = new Fuse(this.cache, this.options);
  }

  public async search(query: string): Promise<FuseResult<T>[]> {
    if (!this.fuse) {
      throw new Error('Fuse.js is not initialized. Call init() first.');
    }
    const lowerCaseQuery = query.toLowerCase();
    // FIXME: По идее нужно удалить
    if (this.cache.length === 0) await this.refreshCache();

    const language = detectLanguage(lowerCaseQuery);
    let searchResult = this.fuse.search(lowerCaseQuery);

    if (searchResult.length === 0) {
      const translatedQuery =
        language === 'ru'
          ? convertCyrillicToLatin(lowerCaseQuery)
          : convertLatinToCyrillic(lowerCaseQuery);
      searchResult = this.fuse.search(translatedQuery);
    }

    return searchResult;
  }
}
