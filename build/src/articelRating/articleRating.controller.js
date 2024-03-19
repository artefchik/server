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
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
const articelRating_service_1 = __importDefault(require("./articelRating.service"));
class ArticleRatingController {
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { articleId } = req.params;
                if (!articleId) {
                    return next(ApiError_1.default.badRequest('Incorrect data'));
                }
                const userId = String(req.body.user._id);
                const comment = yield articelRating_service_1.default.getById(articleId, userId);
                return res.json(comment);
            }
            catch (e) {
                next(e);
            }
        });
    }
    createRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log('body', req.body);
                if (!id || !req.body) {
                    return next(ApiError_1.default.badRequest('Incorrect data'));
                }
                const rating = yield articelRating_service_1.default.createRating(req.body);
                return res.json(rating);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new ArticleRatingController();
