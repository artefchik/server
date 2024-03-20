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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_model_1 = require("./token.model");
const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || 'JWT_REFRESH_KEY';
const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || 'JWT_ACCESS_KEY';
class TokenService {
    generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, JWT_ACCESS_KEY, {
            expiresIn: '15m',
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, JWT_REFRESH_KEY, {
            expiresIn: '20d',
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    saveToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, refreshToken } = data;
            const tokenData = yield token_model_1.TokenModel.findOne({ userId });
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return tokenData.save();
            }
            const token = yield token_model_1.TokenModel.create({
                userId,
                refreshToken,
            });
            return token;
        });
    }
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield token_model_1.TokenModel.deleteOne({ refreshToken });
            return;
        });
    }
    findToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield token_model_1.TokenModel.findOne({ refreshToken });
            return tokenData;
        });
    }
    validateAccessToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, JWT_ACCESS_KEY);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, JWT_REFRESH_KEY);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
}
exports.default = new TokenService();
