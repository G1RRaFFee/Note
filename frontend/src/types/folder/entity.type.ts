import { Contact } from "../contact/entity.type";

export interface Folder {
  readonly id: number;
  readonly name: string;
  readonly contacts: Contact[];
}
