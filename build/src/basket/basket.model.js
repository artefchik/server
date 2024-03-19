"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketModel = void 0;
const mongoose_1 = require("mongoose");
const BasketSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
});
exports.BasketModel = (0, mongoose_1.model)('Basket', BasketSchema);
