import { ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToClass, Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

import { FuseResult } from 'fuse.js';
import { Contact } from 'src/core/entities/contact.entity';
import { Api } from 'src/core/types/api/api.type';

export namespace ContactDto {
  class ContactInfo {
    id: number;
    firstName: string;
    lastName?: string;
    middleName?: string;
    about?: string;
  }
  export namespace Request {
    export class GetContactsQuery {
      @ApiProperty({
        example: 2,
        required: false,
        default: 1,
        description: 'Page number for pagination',
        type: 'integer',
      })
      @Type(() => Number)
      @IsOptional()
      @IsInt()
      @Min(1, { message: 'Page must be greater than 0' })
      offset?: number = 1;

      @ApiProperty({
        required: false,
        type: 'integer',
        example: 10,
        default: 20,
        description: 'number of elements that need to be taken per page',
      })
      @Type(() => Number)
      @IsOptional()
      @IsInt()
      @Min(1, { message: 'Per_page must be greater than 0' })
      limit?: number = 20;
    }

    export class Create {
      @ApiProperty({
        description: 'The firstName of the contact',
        example: 'John Doe',
        type: 'string',
        required: true,
      })
      @IsString()
      @Length(1, 20)
      firstName: string;

      @Exclude()
      userId: number;

      @Exclude()
      folderId: number;

      @IsString()
      @IsOptional()
      @Length(1, 20)
      lastName?: string;

      @IsString()
      @IsOptional()
      @Length(1, 20)
      middleName?: string;

      @IsString()
      @IsEmail()
      @IsOptional()
      @Length(1, 100)
      email?: string;

      @IsString()
      @IsOptional()
      @Length(1)
      avatarUrl?: string;

      @IsString()
      @IsPhoneNumber('RU')
      @IsOptional()
      @Min(1)
      @Max(20)
      phone?: string;

      @IsString()
      @IsDateString()
      @IsOptional()
      @Length(1, 20)
      birthday?: string;

      @IsString()
      @IsOptional()
      @Length(1, 16)
      about?: string;
    }
    export class Update {}
  }

  export namespace Response {
    export namespace Basic {
      export class GetAllContacts {
        pagination: {
          offset: number;
          limit: number;
          totalContacts: number;
          totalPages: number;
        };
        contacts: Array<ContactInfo>;
      }

      export class GetContactById {
        data: Contact;
      }
    }

    export namespace Full {
      export class GetAllContacts extends Api {
        readonly data: {
          pagination: {
            offset: number;
            limit: number;
            totalContacts: number;
            totalPages: number;
          };
          contacts: Array<ContactInfo>;
        };
      }

      export class getPinnedContacts extends Api {
        data: Array<ContactInfo>;
      }

      export class GetContactById extends Api {
        data: Contact;
      }

      export class SearchContacts extends Api {
        readonly data: {
          contacts: FuseResult<Contact>[];
        };
      }
    }
  }
}
