"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = __importDefault(require("uuid"));
// export const multerConfig = {
//     storage: multer.diskStorage({
//             destination: 'uploads/',
//             // destination: function (req: Express.Request, file: Express.Multer.File, callback:DestinationCallback) {
//             //     callback(null, 'static');
//             // },
//             // @ts-ignore
//             filename: function (req: Request, file: Express.Multer.File, callback: FileNameCallback) {
//                 const uniqueSuffix = file.originalname + '.' + uuid.v4()
//                 callback(null, uniqueSuffix)
//             },
//         }
//     ),
//     fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
//         if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
//             return cb(null, false);
//         }
//         cb(null, true);
//     }
// }
//
exports.multerConfig = {
    storage: multer_1.default.diskStorage({
        destination: 'uploads/',
        //@ts-ignore
        filename: function (req, file, callback) {
            const uniqueSuffix = file.originalname + '.' + uuid_1.default.v4();
            callback(null, uniqueSuffix);
        },
    }),
    // fileFilter :(req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    //     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    //         return cb(null, false);
    //     }
    //     cb(null, true);
    // }
};
