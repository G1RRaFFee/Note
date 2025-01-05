export declare class CreateContactDto {
    readonly name: string;
    readonly avatarUrl?: string;
    readonly phone?: string;
    readonly birthday?: string;
    readonly address?: string;
    readonly email?: string;
    constructor(name: string, avatarUrl?: string, phone?: string, birthday?: string, address?: string);
}
