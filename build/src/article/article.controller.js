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
const article_service_1 = __importDefault(require("./article.service"));
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
class ArticleController {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                const articles = yield article_service_1.default.getAll(query);
                if (!articles) {
                    return next(ApiError_1.default.badRequest('Incorrect data'));
                }
                // @ts-ignore
                return res.json(articles);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return next(ApiError_1.default.badRequest('Incorrect data'));
                }
                const article = yield article_service_1.default.getById(id);
                // @ts-ignore
                return res.json(article);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new ArticleController();
