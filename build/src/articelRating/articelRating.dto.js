"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRatingDto = void 0;
class ArticleRatingDto {
    constructor(data) {
        this.id = data._id;
        this.articleId = data.articleId;
        this.feedback = data.feedback;
        this.rate = data.rate;
        this.userId = data.userId;
    }
}
exports.ArticleRatingDto = ArticleRatingDto;
