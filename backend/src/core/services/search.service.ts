import { Injectable } from '@nestjs/common';
import Fuse, { FuseResult, IFuseOptions } from 'fuse.js';
import {
  convertCyrillicToLatin,
  convertLatinToCyrillic,
  detectLanguage,
} from 'src/infrastructure/helpers/search.helper';

@Injectable()
export class SearchService<T> {
  private fuse: Fuse<T>;
  private cache: Map<string, FuseResult<T>[]> = new Map();

  init(data: T[], options: IFuseOptions<T>): void {
    this.fuse = new Fuse(data, options);
  }

  //   TODO: "Посмотреть про кеш и вынести detectLanguage в helpers";
  public search(query: string): FuseResult<T>[] {
    if (!this.fuse) {
      throw new Error('Fuse.js is not initialized. Call init() first.');
    }

    // Проверяем кэш
    if (this.cache.has(query)) {
      console.log('Returning cached result for query:', query);
      return this.cache.get(query)!;
    }

    // Определяем язык запроса
    const language = detectLanguage(query);
    console.log('Detected language:', language);

    // Поиск как есть
    let searchResult = this.fuse.search(query);
    console.log('Initial search result:', searchResult);

    // Если результаты не найдены, пробуем транслитерировать запрос
    if (searchResult.length === 0) {
      const translatedQuery =
        language === 'ru'
          ? convertCyrillicToLatin(query)
          : convertLatinToCyrillic(query);
      console.log('Translated query:', translatedQuery);
      searchResult = this.fuse.search(translatedQuery);
    }

    // Сохраняем результат в кэш
    this.cache.set(query, searchResult);
    return searchResult;
  }
}
