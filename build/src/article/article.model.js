"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModel = void 0;
const mongoose_1 = require("mongoose");
const ArticleSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    views: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    isUpdate: { type: Boolean, default: false },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    types: [String],
    blocks: [
        {
            type: { type: String, required: true },
            title: { type: String },
            paragraph: { type: String },
            src: { type: String },
        },
    ],
});
exports.ArticleModel = (0, mongoose_1.model)('Article', ArticleSchema);
