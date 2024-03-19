"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
const token_service_1 = __importDefault(require("../token/token.service"));
function authMiddleware(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError_1.default.unauthorized());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError_1.default.unauthorized());
        }
        const userData = token_service_1.default.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError_1.default.unauthorized());
        }
        req.body.user = userData;
        next();
    }
    catch (e) {
        return next(ApiError_1.default.unauthorized());
    }
}
exports.authMiddleware = authMiddleware;
;
