import { Contact } from './contact.entity';

export class Folder {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly contacts: Contact[],
    readonly isReserved: boolean,
  ) {}
}
