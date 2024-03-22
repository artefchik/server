"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
const express_validator_1 = require("express-validator");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CLIENT_URL = process.env.CLIENT_URL ? process.env.CLIENT_URL : 'http://localhost:3000';
class UserController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(ApiError_1.default.badRequest('ошибка валидации'));
                }
                const { email, password, username } = req.body;
                const userData = yield user_service_1.default.registration({
                    email,
                    password,
                    username,
                });
                if (!userData) {
                    return next(ApiError_1.default.badRequest('User not found'));
                }
                res.cookie('refreshToken', userData === null || userData === void 0 ? void 0 : userData.refreshToken, {
                    maxAge: 20 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true
                });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userData = yield user_service_1.default.login(email, password);
                if (!userData) {
                    return next(ApiError_1.default.unauthorized());
                }
                res.cookie('refreshToken', userData === null || userData === void 0 ? void 0 : userData.refreshToken, {
                    maxAge: 20 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true
                });
                res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                if (!refreshToken) {
                    return next(ApiError_1.default.badRequest(''));
                }
                yield user_service_1.default.logout(refreshToken);
                res.clearCookie('refreshToken');
                res.json('good');
            }
            catch (e) {
                next(e);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield user_service_1.default.refresh(refreshToken);
                if (!userData) {
                    return next(ApiError_1.default.badRequest('User not found'));
                }
                res.cookie('refreshToken', userData.refreshToken, {
                    maxAge: 20 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true
                });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    // async changeAvatar(req:Request, res: Response, next: NextFunction) {
    //     try {
    //         // @ts-ignore
    //         const user = req.body.user
    //         if (!req.files){
    //             return next(ApiError.badRequest('The avatar has not been uploaded.Try again'))
    //         }
    //         // @ts-ignore
    //         const uploadedFile:  Express.Multer.File = req.files[0]
    //         let buffer = uploadedFile.buffer;
    //         console.log(req.files)
    //         if (!buffer) {
    //             return next(ApiError.badRequest('Image not found'))
    //         }
    //         console.log(s3)
    //         let upload = await s3.Upload(
    //             {
    //                buffer:buffer
    //             },
    //             '/avatars/'
    //         );
    //         if (!upload){
    //             return next(ApiError.badRequest('The avatar has not been uploaded.Try again'))
    //         }
    //         // @ts-ignore
    //         const updatedProfile = await UserModel.findOneAndUpdate<User>(
    //             {_id: new ObjectId(user.id)},
    //             // @ts-ignore
    //             {$set: {avatar:upload.Location}},
    //             {new: true},
    //         );
    //         const userDto = new UserDto(updatedProfile)
    //         return res.json(userDto);
    //
    //     } catch (e) {
    //         next(e)
    //     }
    // }
    activateEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { link } = req.params;
                if (!link) {
                    return next(ApiError_1.default.badRequest('Not activated'));
                }
                yield user_service_1.default.activate(link);
                return res.redirect(CLIENT_URL);
            }
            catch (e) {
                next(e);
            }
        });
    }
    confirmEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield user_service_1.default.confirmEmail(id);
                res.status(200).send('good');
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new UserController();
