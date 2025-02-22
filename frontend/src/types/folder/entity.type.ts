import { Contact } from "../contact/entity.type";

export class Folder {
  readonly id: number;
  readonly name: string;
  readonly contacts: Contact[];
  readonly isReserved: boolean;
}
