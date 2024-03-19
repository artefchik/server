"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketDto = void 0;
class BasketDto {
    constructor(data) {
        this.id = data._id;
        this.userId = data.userId;
    }
}
exports.BasketDto = BasketDto;
