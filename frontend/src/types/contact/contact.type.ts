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

export interface GetPaginatedContactsResponse {
  statusCode: number;
  message: string;
  data: {
    paginationDetails: {
      currentPage: number;
      perPage: number;
      totalContacts: number;
      totalPages: number;
    };
    contacts: {
      id: number;
      name: string;
      // surname: string;
      // patronymic: string;
      // about: string;
    }[];
  };
}
