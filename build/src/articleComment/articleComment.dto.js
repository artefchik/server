"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleCommentDto = void 0;
class ArticleCommentDto {
    constructor(data) {
        this.id = data._id;
        this.articleId = data.articleId;
        this.text = data.text;
    }
}
exports.ArticleCommentDto = ArticleCommentDto;
