import { Api } from "../api/api.type";
import { Contact } from "./entity.type";

export namespace ContactDto {
  export namespace Request {
    export class Create {}
    export class Update {}
  }
  export namespace Response {
    export namespace Basic {}

    export namespace Full {
      export class SearchContacts extends Api {
        readonly data: {
          contacts: {
            item: Contact;
            refIndex: number;
          }[];
        };
      }

      export class GetContactById extends Api {
        readonly data: Contact | null;
      }

      export class GetPaginatedContacts extends Api {
        readonly data: {
          paginationDetails: {
            currentPage: number;
            perPage: number;
            totalContacts: number;
            totalPages: number;
          };
          contacts: {
            id: number;
            firstName: string;
            lastName?: string;
            middleName?: string;
            about?: string;
          }[];
        };
      }
    }
  }
}
