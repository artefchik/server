"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleDto = void 0;
class ArticleDto {
    constructor(data) {
        this.id = data._id;
        this.title = data.title;
        this.img = data.img;
        this.views = data.views;
        this.createdAt = data.createdAt;
        this.types = data.types;
        this.blocks = data.blocks;
    }
}
exports.ArticleDto = ArticleDto;
