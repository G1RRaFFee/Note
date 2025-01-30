export interface Contact {
  readonly id: number;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly folderID: number[];
  readonly noteID: number;
  readonly avatarUrl: string;
  readonly phone: string;
  readonly birthday: string;
  readonly address: string;
}

export interface GetContactsResponse {
  statusCode: number;
  message: string;
  data: {
    contacts: Pick<Contact, "id" | "name">[];
  };
}
