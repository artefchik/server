"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketProductModel = void 0;
const mongoose_1 = require("mongoose");
const BasketProductSchema = new mongoose_1.Schema({
    basketId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Basket',
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
    },
    count: {
        type: Number,
        default: 1,
    },
});
exports.BasketProductModel = (0, mongoose_1.model)('BasketProduct', BasketProductSchema);
