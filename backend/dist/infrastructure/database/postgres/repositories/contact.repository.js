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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresContactRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../services/prisma/prisma.service");
let PostgresContactRepository = class PostgresContactRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getContactById(id) {
        const foundContact = await this.prismaService.contact.findUnique({
            where: {
                id: id,
            },
        });
        return foundContact;
    }
    async getAllContacts() {
        const contacts = await this.prismaService.contact.findMany();
        return contacts;
    }
    async removeContact(id) {
        const deletedContact = await this.prismaService.contact.delete({
            where: { id: id },
        });
        return deletedContact;
    }
    async updateContact(id, updateContactDto) {
        const updatedContact = await this.prismaService.contact.update({
            where: { id: id },
            data: updateContactDto,
        });
        return updatedContact;
    }
    async createContact(createContactDto) {
        const newContact = await this.prismaService.contact.create({
            data: createContactDto,
        });
        return newContact;
    }
};
exports.PostgresContactRepository = PostgresContactRepository;
exports.PostgresContactRepository = PostgresContactRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostgresContactRepository);
//# sourceMappingURL=contact.repository.js.map