import { Contact } from '@prisma/client';

export namespace ContactDto {
  export namespace Request {
    export class Create {}
    export class Update {}
  }
  export namespace Response {
    export class GetAll {
      readonly statusCode: number;
      readonly message: string;
      readonly data: {
        contacts: Pick<Contact, 'name' | 'id'>[];
      };
    }
  }
}
