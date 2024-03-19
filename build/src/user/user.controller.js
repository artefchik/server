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
                });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    changeAvatar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.file);
                return res.json(req.file);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new UserController();
