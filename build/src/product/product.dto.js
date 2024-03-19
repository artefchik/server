"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDto = void 0;
class ProductDto {
    constructor(data) {
        this.id = data._id;
        this.title = data.title;
        this.category = data.category;
        this.color = data.color;
        this.imageSrc = data.imageSrc;
        this.memory = data.memory;
        this.price = data.price;
    }
}
exports.ProductDto = ProductDto;
