export declare class User {
    readonly id: number;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: number, username: string, email: string, password: string, createdAt: Date, updatedAt: Date);
}
