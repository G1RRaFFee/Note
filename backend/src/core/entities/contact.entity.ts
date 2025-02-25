export class Contact {
  constructor(
    readonly id: number,
    readonly firstName: string,
    readonly lastName?: string,
    readonly middleName?: string,
    readonly email?: string,
    readonly folderId?: number,
    readonly avatarUrl?: string,
    readonly phone?: string,
    readonly birthday?: string,
    readonly about?: string,
    readonly isPinned?: boolean,
  ) {}
}
