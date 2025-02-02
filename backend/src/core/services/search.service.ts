import { Injectable } from '@nestjs/common';
import Fuse, { FuseResult, IFuseOptions } from 'fuse.js';
import {
  extendDataWithTransliteration,
  transliterate,
} from 'src/infrastructure/helpers/fuse.helper';

@Injectable()
export class SearchService<T> {
  private fuse: Fuse<T>;

  init(data: T[], options: IFuseOptions<T>, fields: (keyof T)[]) {
    const extendedData = extendDataWithTransliteration(data, fields);
    const extendedOptions: IFuseOptions<T> = {
      ...options,
      keys: [
        ...(options.keys || []),
        ...fields.map((field) => `${String(field)}Transliterated`),
      ],
    };
    this.fuse = new Fuse(extendedData, extendedOptions);
  }

  public search(query: string): FuseResult<T>[] {
    if (!this.fuse) {
      throw new Error('Fuse.js is not initialized. Call init() first.');
    }

    console.log('translate: ', transliterate(query));
    return this.fuse.search(query);
  }
}
