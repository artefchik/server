"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteItemModel = void 0;
const mongoose_1 = require("mongoose");
const FavoriteItemSchema = new mongoose_1.Schema({
    favoriteId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Favorite',
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
    },
    isFavorite: { type: Boolean }
});
exports.FavoriteItemModel = (0, mongoose_1.model)('FavoriteItem', FavoriteItemSchema);
