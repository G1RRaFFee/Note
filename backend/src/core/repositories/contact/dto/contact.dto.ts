// TODO: Изменить в бд в Contact: name -> name, surname, patronymic; поле about (Краткое сведение о контакте)
export namespace ContactDto {
  export namespace Request {
    export class Create {}
    export class Update {}
  }
  export namespace Response {
    export class GetPaginatedContacts {
      readonly statusCode: number;
      readonly message: string;
      readonly data: {
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
  }
}
