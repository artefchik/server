"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteModel = void 0;
const mongoose_1 = require("mongoose");
const FavoriteSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
});
exports.FavoriteModel = (0, mongoose_1.model)('Favorite', FavoriteSchema);
