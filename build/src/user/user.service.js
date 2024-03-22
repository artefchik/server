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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("./user.model");
const user_dto_1 = require("./user.dto");
const token_service_1 = __importDefault(require("../token/token.service"));
const profile_service_1 = __importDefault(require("../profile/profile.service"));
const basket_service_1 = __importDefault(require("../basket/basket.service"));
const favorite_service_1 = __importDefault(require("../favorite/favorite.service"));
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
const uuid_1 = require("uuid");
const mail_service_1 = __importDefault(require("../mail/mail.service"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SERVER_URL = process.env.SERVER_URL ? process.env.SERVER_URL : 'http://localhost:8000';
class UserService {
    getDto(user) {
        return new user_dto_1.UserDto(user);
    }
    registration(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, username, password } = userData;
            const userFromDb = yield user_model_1.UserModel.findOne({ email });
            if (userFromDb) {
                throw ApiError_1.default.badRequest(`The user with email ${email} already exists`);
            }
            const userWithName = yield user_model_1.UserModel.findOne({ username });
            if (userWithName) {
                throw ApiError_1.default.badRequest(`The user with username ${username} already exists`);
            }
            const hasPassword = yield bcrypt_1.default.hash(password, 4);
            const activatedLinkEmail = (0, uuid_1.v4)();
            const user = yield user_model_1.UserModel.create({
                email,
                username,
                password: hasPassword,
                activatedLinkEmail,
            });
            const userDto = this.getDto(user);
            const tokens = token_service_1.default.generateTokens(Object.assign({}, userDto));
            yield token_service_1.default.saveToken({
                userId: userDto.id,
                refreshToken: tokens.refreshToken,
            });
            yield profile_service_1.default.createProfile(userDto.id);
            yield basket_service_1.default.createBasket(userDto.id);
            yield favorite_service_1.default.createFavoriteStorage(userDto.id);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ email });
            if (!user) {
                throw ApiError_1.default.badRequest('User not found');
            }
            const isPasswordEquals = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordEquals) {
                throw ApiError_1.default.badRequest('Passwords don\'t match');
            }
            const userDto = new user_dto_1.UserDto(user);
            const tokens = token_service_1.default.generateTokens(Object.assign({}, userDto));
            yield token_service_1.default.saveToken({
                userId: userDto.id,
                refreshToken: tokens.refreshToken,
            });
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield token_service_1.default.removeToken(refreshToken);
            return token;
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = token_service_1.default.validateRefreshToken(refreshToken);
            const tokenInDb = yield token_service_1.default.findToken(refreshToken);
            if (!userData || !tokenInDb) {
                throw ApiError_1.default.badRequest('User not found');
            }
            //@ts-ignore
            const user = yield user_model_1.UserModel.findById(userData.id);
            if (!user) {
                throw ApiError_1.default.badRequest(`User not found`);
            }
            const userDto = new user_dto_1.UserDto(user);
            const tokens = token_service_1.default.generateTokens(Object.assign({}, userDto));
            yield token_service_1.default.saveToken({
                userId: userDto.id,
                refreshToken: tokens.refreshToken,
            });
            if (tokens && userDto) {
                return Object.assign(Object.assign({}, tokens), { user: userDto });
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findById(id);
            if (!user) {
                throw ApiError_1.default.badRequest('User not found');
            }
            return new user_dto_1.UserDto(user);
        });
    }
    activate(activatedLinkEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ activatedLinkEmail });
            if (!user) {
                throw ApiError_1.default.badRequest('User not found');
            }
            user.isActivatedEmail = true;
            yield user.save();
        });
    }
    confirmEmail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findById(id);
            if (!user) {
                throw ApiError_1.default.badRequest('User not found');
            }
            yield mail_service_1.default.sendMail(user.email, `${SERVER_URL}/activate/${user.activatedLinkEmail}`);
            return;
        });
    }
}
exports.default = new UserService();
