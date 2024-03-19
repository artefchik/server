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
const articleComment_model_1 = __importDefault(require("./articleComment.model"));
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
const user_service_1 = __importDefault(require("../user/user.service"));
const articleComment_dto_1 = require("./articleComment.dto");
class ArticleCommentsService {
    getById(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentsData = yield articleComment_model_1.default.find({
                articleId: new mongodb_1.ObjectId(articleId),
            });
            if (!commentsData) {
                throw ApiError_1.default.badRequest('No comments found');
            }
            function processCommentsWithUsers(commentsData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const commentsWithUsers = [];
                    for (const comment of commentsData) {
                        try {
                            // @ts-ignore
                            const user = yield user_service_1.default.getOne(comment.userId);
                            const commentDto = new articleComment_dto_1.ArticleCommentDto(comment);
                            commentsWithUsers.push(Object.assign(Object.assign({}, commentDto), { user }));
                        }
                        catch (error) {
                            console.error(`Error processing comment`);
                        }
                    }
                    return commentsWithUsers;
                });
            }
            return yield processCommentsWithUsers(commentsData);
        });
    }
    createComment(commentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { articleId, userId, text } = commentData;
            if (!articleId || !userId || !text) {
                throw ApiError_1.default.badRequest('Incorrect data');
            }
            const newComment = yield articleComment_model_1.default.create({
                articleId: new mongodb_1.ObjectId(articleId),
                userId: new mongodb_1.ObjectId(userId),
                text,
            });
            const user = yield user_service_1.default.getOne(new mongodb_1.ObjectId(userId));
            const commentDto = new articleComment_dto_1.ArticleCommentDto(newComment);
            return Object.assign(Object.assign({}, commentDto), { user });
        });
    }
    updateComment(commentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { articleId, userId, text, id } = commentData;
            if (!articleId || !userId || !text) {
                throw ApiError_1.default.badRequest('Incorrect data');
            }
            const updatedComment = yield articleComment_model_1.default.updateOne({
                _id: new mongodb_1.ObjectId(id),
            }, { $set: { text } });
            return updatedComment;
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteComment = yield articleComment_model_1.default.findByIdAndDelete(id);
            return deleteComment;
        });
    }
}
exports.default = new ArticleCommentsService();
