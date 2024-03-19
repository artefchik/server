"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = __importDefault(require("uuid"));
exports.storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'static');
    },
    // @ts-ignore
    filename: function (req, file, callback) {
        const uniqueSuffix = file.originalname + '.' + uuid_1.default.v4();
        callback(null, file.fieldname + '-' + uniqueSuffix);
    }
});
exports.default = (0, multer_1.default)({ storage: exports.storage });
