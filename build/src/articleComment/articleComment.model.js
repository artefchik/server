"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ArticleCommentsSchema = new mongoose_1.Schema({
    articleId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Article' },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
});
exports.default = (0, mongoose_1.model)('ArticleComment', ArticleCommentsSchema);
