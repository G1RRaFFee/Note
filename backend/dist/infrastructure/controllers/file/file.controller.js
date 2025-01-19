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
const fs_1 = require("fs");
const path_1 = require("path");
const auth_guard_1 = require("../../common/guards/auth.guard");
let FileController = class FileController {
    async getFileById(filename, response) {
        const filePath = (0, path_1.join)(process.cwd(), '..', 'uploads', filename);
        console.log('File path:', filePath);
        if (!(0, fs_1.existsSync)(filePath)) {
            return response.status(404).send('File not found');
        }
        response.setHeader('Content-Type', 'image/png');
        response.sendFile(filePath);
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.Get)(':filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFileById", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)('files'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard)
], FileController);
//# sourceMappingURL=file.controller.js.map