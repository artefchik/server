"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_router_1 = __importDefault(require("./products.router"));
const user_router_1 = __importDefault(require("./user.router"));
const basket_router_1 = __importDefault(require("./basket.router"));
const article_router_1 = __importDefault(require("./article.router"));
const favorite_router_1 = __importDefault(require("./favorite.router"));
const profile_router_1 = __importDefault(require("./profile.router"));
const auth_middleware_1 = require("../middleware/auth.middleware");
// @ts-ignore
const router = new express_1.Router();
router.use('/', user_router_1.default);
router.use('/products', products_router_1.default);
router.use('/profile', profile_router_1.default);
router.use('/basket', auth_middleware_1.authMiddleware, basket_router_1.default);
router.use('/articles', article_router_1.default);
router.use('/favorites', auth_middleware_1.authMiddleware, favorite_router_1.default);
exports.default = router;
