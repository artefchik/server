"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
    }, brand: {
        type: String,
        required: true,
    },
    memory: { type: String },
    price: {
        current: { type: Number },
        previous: { type: Number },
    },
});
exports.ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
