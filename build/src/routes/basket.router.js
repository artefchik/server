"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const basket_controller_1 = __importDefault(require("../basket/basket.controller"));
// @ts-ignore
const router = new express_1.Router();
router.post('/:id', basket_controller_1.default.addProduct);
router.get('/:id', basket_controller_1.default.getProducts);
router.get('/init/:id', basket_controller_1.default.getBasket);
router.patch('/:id', basket_controller_1.default.updateProduct);
router.delete('/:id/', basket_controller_1.default.deleteProduct);
router.delete('/:id/all', basket_controller_1.default.deleteAllProduct);
exports.default = router;
