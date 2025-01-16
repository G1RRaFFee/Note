import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateContactDto {
  @IsEmail()
  readonly email?: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly avatarUrl?: string;

  @IsPhoneNumber()
  readonly phone?: string;

  @IsDateString()
  readonly birthday?: string;

  @IsString()
  readonly address?: string;

  @IsNumber()
  readonly userId: number;
}
