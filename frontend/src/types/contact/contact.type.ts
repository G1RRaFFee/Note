import { Api } from "../api/api.type";
import { PaginationDetails } from "../paginationDetails/entity.type";

export namespace ContactDto {
  export class Contact {
    readonly id: number;
    readonly firstName: string;
    readonly lastName?: string;
    readonly middleName?: string;
    readonly avatarUrl?: string;
    readonly about?: string;
  }

  export namespace Request {
    export class Create {}
    export class Update {}
  }
  export namespace Response {
    export namespace Basic {}

    export namespace Full {
      export class SearchContacts extends Api {
        readonly data: {
          contacts: Array<{
            item: Contact;
            refIndex: number;
          }>;
        };
      }

      export class GetContactById extends Api {
        readonly data: Contact | null;
      }

      export class GetAllContacts extends Api {
        data: {
          paginationDetails: PaginationDetails;
          contacts: Array<ContactDto.Contact>;
        };
      }
    }
  }
}
