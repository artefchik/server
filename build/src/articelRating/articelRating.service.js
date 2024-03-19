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
const mongodb_1 = require("mongodb");
const articelRating_model_1 = __importDefault(require("./articelRating.model"));
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
const articelRating_dto_1 = require("./articelRating.dto");
class ArticleRatingService {
    getById(articleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rating = yield articelRating_model_1.default.findOne({
                articleId: new mongodb_1.ObjectId(articleId),
                // userId: new ObjectId(userId),
            });
            console.log(articleId, userId);
            if (!rating) {
                return {};
            }
            return new articelRating_dto_1.ArticleRatingDto(rating);
        });
    }
    createRating(ratingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { articleId, userId, feedback, rate } = ratingData;
            const ratingInDb = yield articelRating_model_1.default.findOne({
                articleId: new mongodb_1.ObjectId(articleId),
                userId: new mongodb_1.ObjectId(userId),
            });
            if (ratingInDb) {
                throw ApiError_1.default.badRequest('The rating is already there');
            }
            const newRate = yield articelRating_model_1.default.create({
                articleId: new mongodb_1.ObjectId(articleId),
                userId: new mongodb_1.ObjectId(userId),
                rate,
                feedback
            });
            // const user = await UserService.getOne(new ObjectId(userId));
            const rating = new articelRating_dto_1.ArticleRatingDto(newRate);
            return rating;
        });
    }
}
exports.default = new ArticleRatingService();
