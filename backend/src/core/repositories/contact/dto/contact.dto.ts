import { FuseResult } from 'fuse.js';
import { Contact } from 'src/core/entities/contact.entity';

export namespace ContactDto {
  export namespace Request {
    export class Create {
      firstName: string;
      folderId: number;
      userId: number;
      lastName?: string;
      middleName?: string;
      email?: string;
      avatarUrl?: string;
      phone?: string;
      birthday?: string;
      about?: string;
    }
    export class Update {}
  }
  export namespace Response {
    export namespace Basic {
      export class GetPaginatedContacts {
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
      }
    }

    export namespace Full {
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
            firstName: string;
            lastName?: string;
            middleName?: string;
            about?: string;
          }[];
        };
      }

      export class SearchContacts {
        readonly statusCode: number;
        readonly message: string;
        readonly data: {
          contacts: FuseResult<Contact>[];
        };
      }
    }
  }
}
