"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteDto = void 0;
class FavoriteDto {
    constructor(data) {
        this.id = data._id;
        this.userId = data.userId;
    }
}
exports.FavoriteDto = FavoriteDto;
