"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketProductDto = void 0;
class BasketProductDto {
    constructor(data) {
        this.id = data._id;
        this.basketId = data.basketId;
        this.productId = data.productId;
        this.count = data.count;
    }
}
exports.BasketProductDto = BasketProductDto;
