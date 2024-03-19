"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
const easy_yandex_s3_1 = __importDefault(require("easy-yandex-s3"));
const ACCESS_KEY_BACKET = process.env.ACCESS_KEY_BACKET ? process.env.ACCESS_KEY_BACKET : '';
const SECRET_ACCESS_KEY_BACKET = process.env.SECRET_ACCESS_KEY_BACKET ? process.env.SECRET_ACCESS_KEY_BACKET : '';
const NAME_BACKET = process.env.NAME_BACKET ? process.env.NAME_BACKET : '';
exports.s3 = new easy_yandex_s3_1.default({
    auth: {
        accessKeyId: ACCESS_KEY_BACKET,
        secretAccessKey: SECRET_ACCESS_KEY_BACKET,
    },
    Bucket: NAME_BACKET, // например, "my-storage",
    debug: true, // Дебаг в консоли, потом можете удалить в релизе
});
