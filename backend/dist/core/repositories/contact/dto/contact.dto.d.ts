import { Contact } from '@prisma/client';
export declare namespace ContactDto {
    namespace Request {
        class Create {
        }
        class Update {
        }
    }
    namespace Response {
        class GetAll {
            readonly statusCode: number;
            readonly message: string;
            readonly data: {
                contacts: Pick<Contact, 'name' | 'id'>[];
            };
        }
    }
}
