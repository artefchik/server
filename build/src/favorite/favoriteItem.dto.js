"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteItemDto = void 0;
class FavoriteItemDto {
    constructor(data) {
        this.id = data._id;
        this.favoriteId = data.favoriteId;
        this.productId = data.productId;
        this.isFavorite = data.isFavorite;
    }
}
exports.FavoriteItemDto = FavoriteItemDto;
