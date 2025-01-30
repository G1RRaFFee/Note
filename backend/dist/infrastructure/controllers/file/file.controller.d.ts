import { StreamableFile } from '@nestjs/common';
export declare class FileController {
    private readonly uploadsPath;
    uploadFile(file: Express.Multer.File): {
        success: number;
        file: {
            url: string;
            name: string;
            size: number;
        };
    };
    getFile(filename: string): Promise<StreamableFile>;
}
