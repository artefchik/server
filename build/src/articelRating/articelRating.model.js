"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ArticleRatingSchema = new mongoose_1.Schema({
    articleId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Article' },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    feedback: { type: String, default: '' },
    rate: { type: Number },
});
exports.default = (0, mongoose_1.model)('ArticleRating', ArticleRatingSchema);
