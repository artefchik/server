"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../product/product.controller"));
// @ts-ignore
const router = new express_1.Router();
router.get('/', product_controller_1.default.getAll);
router.get('/:id', product_controller_1.default.getOne);
exports.default = router;
