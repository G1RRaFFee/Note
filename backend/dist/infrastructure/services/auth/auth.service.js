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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../../core/services/user.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const uuid_1 = require("uuid");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prismaService, userService, jwtService) {
        this.prismaService = prismaService;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signUp(signUpData) {
        const { username, email, password } = signUpData;
        const isUserExist = await this.userService.findByEmail(email);
        if (isUserExist)
            throw new common_1.BadRequestException();
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        return await this.userService.create(email, hashedPassword, username);
    }
    async signIn(email, password) {
        const user = await this.userService.findByEmail(email);
        if (!user)
            throw new common_1.UnauthorizedException();
        const isPasswordEquals = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordEquals)
            throw new common_1.UnauthorizedException();
        const payload = { subset: user.id, email: user.email };
        return await this.generateTokens(payload.subset);
    }
    async generateTokens(userId) {
        const accessToken = this.jwtService.sign({ id: userId }, {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
            secret: process.env.JWT_SECRET,
        });
        const refreshToken = (0, uuid_1.v4)();
        await this.saveRefreshToken(userId, refreshToken);
        return {
            accessToken,
            refreshToken,
        };
    }
    async saveRefreshToken(userId, token) {
        const expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 3);
        const existingToken = await this.prismaService.refreshToken.findUnique({
            where: { userId: userId },
        });
        if (existingToken) {
            await this.prismaService.refreshToken.update({
                where: { userId: userId },
                data: {
                    token: token,
                    expiresAt: expiresDate,
                },
            });
        }
        else {
            await this.prismaService.refreshToken.create({
                data: {
                    token: token,
                    expiresAt: expiresDate,
                    userId: userId,
                },
            });
        }
    }
    async refreshTokens(refreshToken) {
        const tokenRecord = await this.prismaService.refreshToken.findFirst({
            where: {
                token: refreshToken,
                expiresAt: {
                    gte: new Date(),
                },
            },
        });
        if (!tokenRecord)
            throw new common_1.UnauthorizedException('Некорректный токен');
        return this.generateTokens(tokenRecord.userId);
    }
    async logout(refreshToken) {
        const token = await this.prismaService.refreshToken.delete({
            where: {
                token: refreshToken,
            },
        });
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map