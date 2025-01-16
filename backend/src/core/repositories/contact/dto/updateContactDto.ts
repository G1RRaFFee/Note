import {
  IsDateString,
  IsEmail,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateContactDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly avatarUrl?: string;

  @IsEmail()
  readonly email?: string;

  @IsPhoneNumber()
  readonly phone?: string;

  @IsDateString()
  readonly birthday?: string;

  @IsString()
  readonly address?: string;
}
