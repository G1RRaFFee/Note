import { IFuseOptions } from 'fuse.js';

interface Data {
  id: number;
  name: string;
  about: string;
}

export const fuseOptions: IFuseOptions<Data> = {
  keys: ['name', 'about'],
  threshold: 0.3,
  ignoreLocation: true,
  isCaseSensitive: false,
};
