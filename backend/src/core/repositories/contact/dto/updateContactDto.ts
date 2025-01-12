export class UpdateContactDto {
  constructor(
    readonly name: string,
    readonly avatar?: string,
    readonly email?: string,
    readonly phone?: string,
    readonly birthday?: string,
    readonly address?: string,
  ) {}
}
