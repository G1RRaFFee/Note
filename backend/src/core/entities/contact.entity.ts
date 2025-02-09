export class Contact {
  constructor(
    readonly id: number,
    readonly firstName: string,
    readonly lastName?: string,
    readonly middleName?: string,
    readonly email?: string,
    readonly folderId?: number[],
    readonly noteId?: number,
    readonly avatarUrl?: string,
    readonly phone?: string,
    readonly birthday?: string,
    readonly address?: string,
    readonly about?: string,
    readonly isPinned?: boolean,
  ) {}
}

// class Metadata {
//   constructor(
//     readonly createdAt: Date,
//     readonly updatedAt: Date,
//   ) {}
// }
