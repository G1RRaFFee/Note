export declare class Contact {
    readonly id: number;
    readonly name: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly folderID?: number[];
    readonly noteID?: number;
    readonly avatarUrl?: string;
    readonly phone?: string;
    readonly birthday?: string;
    readonly address?: string;
    constructor(id: number, name: string, createdAt: Date, updatedAt: Date, folderID?: number[], noteID?: number, avatarUrl?: string, phone?: string, birthday?: string, address?: string);
}
