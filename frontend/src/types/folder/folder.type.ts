import { Api } from "../api/api.type";
import { ContactDto } from "../contact/contact.type";
import { PaginationDetails } from "../paginationDetails/entity.type";
import { UserDto } from "../user/user.type";

export namespace FolderDto {
  export class Folder {
    readonly id: number;
    readonly name: string;
  }

  export namespace Request {
    export class Create {}
    export class Update {}
  }

  export namespace Response {
    export namespace Basic {}

    export namespace Full {
      export class getAllFolders extends Api {
        data: ReadonlyArray<FolderDto.Folder>;
      }

      export class getAllContactsFromFolder extends Api {
        data: {
          contacts: {
            data: Array<ContactDto.Contact>;
            paginationDetails: PaginationDetails;
          };
          pinnedContacts?: Array<ContactDto.Contact>;
          user?: UserDto.User;
        };
      }
    }
  }
}
