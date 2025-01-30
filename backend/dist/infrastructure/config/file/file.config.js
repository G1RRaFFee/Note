"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const file_constant_1 = require("../../common/constants/file/file.constant");
const fileOptions = {
    limits: {
        fileSize: file_constant_1.FILE_SIZE,
    },
    fileFilter: (request, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|pdf)$/)) {
            return callback(new Error('Only files are allowed!'), false);
        }
        callback(null, true);
    },
    storage: (0, multer_1.diskStorage)({
        destination: (0, path_1.join)(process.cwd(), '..', 'uploads'),
        filename: (request, file, callback) => {
            const extension = (0, path_1.extname)(file.originalname);
            const uniqueSuffix = (0, uuid_1.v4)();
            const filename = `${uniqueSuffix}${extension}`;
            callback(null, filename);
        },
    }),
};
exports.default = fileOptions;
//# sourceMappingURL=file.config.js.map