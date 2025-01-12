import { IsEmail } from 'class-validator';

export class CreateContactDto {
  @IsEmail()
  readonly email?: string;

  constructor(
    readonly name: string,
    readonly avatarUrl?: string,
    readonly phone?: string,
    readonly birthday?: string,
    readonly address?: string,
  ) {}
}
