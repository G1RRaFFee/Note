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
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../common/guards/auth.guard");
const contact_service_1 = require("../../../core/services/contact.service");
const platform_express_1 = require("@nestjs/platform-express");
const file_config_1 = require("../../config/file/file.config");
const createContactDto_1 = require("../../../core/repositories/contact/dto/createContactDto");
const extract_user_1 = require("../../common/decorators/extract.user");
let ContactController = class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    async getAllWithIdAndNameOnly() {
        const contacts = await this.contactService.getAllWithIdAndNameOnly();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Contacts successfully received',
            data: { contacts },
        };
    }
    async getById(id) {
        return await this.contactService.getContactbyId(id);
    }
    async createContact(user, createContactDto, avatarUrl) {
        try {
            createContactDto.userId = user.id;
            if (avatarUrl) {
                createContactDto.avatarUrl = `uploads/${avatarUrl.filename}`;
            }
            const contact = await this.contactService.createContact(createContactDto);
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Contact successfully created.',
                data: contact,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: 'Internal server error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    handleError(error) {
        if (error instanceof common_1.HttpException) {
            throw error;
        }
        throw new common_1.HttpException({ message: 'Internal server error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getAllWithIdAndNameOnly", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatarUrl', file_config_1.default)),
    __param(0, (0, extract_user_1.User)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createContactDto_1.CreateContactDto, Object]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "createContact", null);
exports.ContactController = ContactController = __decorate([
    (0, common_1.Controller)('contacts'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.controller.js.map