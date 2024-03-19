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
const articleComment_service_1 = __importDefault(require("./articleComment.service"));
class ArticleCommentsController {
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return next(ApiError_1.default.badRequest('Incorrect data'));
                }
                const comments = yield articleComment_service_1.default.getById(id);
                return res.json(comments);
            }
            catch (e) {
                next(e);
            }
        });
    }
    createComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return next(ApiError_1.default.badRequest('Incorrect data'));
                }
                const comments = yield articleComment_service_1.default.createComment(req.body);
                return res.json(comments);
            }
            catch (e) {
                next(e);
            }
        });
    }
    deleteComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return next(ApiError_1.default.badRequest('Incorrect data'));
                }
                const deleteComment = yield articleComment_service_1.default.deleteComment(id);
                res.json(deleteComment);
            }
            catch (e) {
                next(e);
            }
        });
    }
    updateComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return next(ApiError_1.default.badRequest('Incorrect data'));
                }
                const updatedComments = yield articleComment_service_1.default.updateComment(req.body);
                res.json(updatedComments);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new ArticleCommentsController();
