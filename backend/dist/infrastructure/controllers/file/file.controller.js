"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const mime_types_1 = require("mime-types");
const path_1 = require("path");
const file_config_1 = require("../../config/file/file.config");
let FileController = class FileController {
    constructor() {
        this.uploadsPath = (0, path_1.join)(process.cwd(), '..', 'uploads');
    }
    uploadFile(file) {
        if (!file)
            throw new common_1.BadRequestException('File is required');
        const fileUrl = `http://localhost:5000/api/files/${file.filename}`;
        return {
            success: 1,
            file: {
                url: fileUrl,
                name: file.originalname,
                size: file.size,
            },
        };
    }
    async getFile(filename) {
        const filePath = (0, path_1.join)(this.uploadsPath, filename);
        const file = (0, fs_1.statSync)(filePath);
        if (!file)
            throw new common_1.NotFoundException('File not found');
        try {
            const mimeType = (0, mime_types_1.lookup)(filename) || 'application/octet-stream';
            const readStream = (0, fs_1.createReadStream)(filePath);
            readStream.on('error', (error) => {
                throw new common_1.InternalServerErrorException('Error reading file', {
                    cause: error,
                });
            });
            return new common_1.StreamableFile(readStream, {
                type: mimeType,
                disposition: `attachment; filename=${filename}`,
                length: file.size,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('File not found', {
                cause: error,
            });
        }
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', file_config_1.default)),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFile", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)('files')
], FileController);
//# sourceMappingURL=file.controller.js.map