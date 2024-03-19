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
const article_model_1 = require("./article.model");
const user_service_1 = __importDefault(require("../user/user.service"));
const article_dto_1 = require("./article.dto");
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
class ArticleService {
    getAll(query) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const limit = (_a = query.limit) !== null && _a !== void 0 ? _a : 2;
            const page = (_b = query.page) !== null && _b !== void 0 ? _b : 1;
            const order = (_c = query.order) !== null && _c !== void 0 ? _c : 'asc';
            const sort = (_d = query.sort) !== null && _d !== void 0 ? _d : 'createdAt';
            let articles;
            let queryFilter = {};
            if (query.types) {
                // @ts-ignore
                queryFilter.types = { $elemMatch: { $eq: query.types } };
                // queryFilter.types = query.types
            }
            console.log(queryFilter, sort, order);
            let querySort = {};
            if (query.sort) {
                querySort[sort] = order;
            }
            console.log(querySort);
            articles = yield article_model_1.ArticleModel.find(queryFilter)
                .sort(querySort)
                .skip(page * limit - limit)
                .limit(limit);
            function processArticlesWithUsers(articles) {
                return __awaiter(this, void 0, void 0, function* () {
                    const articlesWithUsers = [];
                    for (const article of articles) {
                        try {
                            const user = yield user_service_1.default.getOne(article.userId);
                            const articleDto = new article_dto_1.ArticleDto(article);
                            articlesWithUsers.push(Object.assign(Object.assign({}, articleDto), { user }));
                        }
                        catch (error) {
                            console.error(`Error processing comment: ${error}`);
                        }
                    }
                    return articlesWithUsers;
                });
            }
            return processArticlesWithUsers(articles);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield article_model_1.ArticleModel.findById(id);
            if (!article) {
                throw ApiError_1.default.badRequest('Article not found');
            }
            const user = yield user_service_1.default.getOne(article.userId);
            const articleDto = new article_dto_1.ArticleDto(article);
            return Object.assign(Object.assign({}, articleDto), { user });
        });
    }
}
exports.default = new ArticleService();
