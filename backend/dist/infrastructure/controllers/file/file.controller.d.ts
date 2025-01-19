import { Response } from 'express';
export declare class FileController {
    getFileById(filename: string, response: Response): Promise<Response<any, Record<string, any>>>;
}
