"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const article_controller_1 = __importDefault(require("../article/article.controller"));
const articleComment_controller_1 = __importDefault(require("../articleComment/articleComment.controller"));
const articleRating_controller_1 = __importDefault(require("../articelRating/articleRating.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
// @ts-ignore
const articlesRouter = new express_1.Router();
articlesRouter.get('/', article_controller_1.default.getAll);
articlesRouter.get('/:id', article_controller_1.default.getById);
articlesRouter.post('/comments/:id', articleComment_controller_1.default.createComment);
articlesRouter.get('/comments/:id', articleComment_controller_1.default.getById);
articlesRouter.delete('/comments/:id', articleComment_controller_1.default.deleteComment);
articlesRouter.patch('/comments/:id', articleComment_controller_1.default.updateComment);
articlesRouter.post('/rating/:id', auth_middleware_1.authMiddleware, articleRating_controller_1.default.createRating);
articlesRouter.get('/rating/:articleId', auth_middleware_1.authMiddleware, articleRating_controller_1.default.getById);
exports.default = articlesRouter;
