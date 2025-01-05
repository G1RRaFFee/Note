export class Contact {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly folderID?: number[],
    readonly noteID?: number,
    readonly avatar?: string,
    readonly phone?: string,
    readonly birthday?: string,
    readonly address?: string,
  ) {}
}
