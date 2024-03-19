"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favorite_controller_1 = __importDefault(require("../favorite/favorite.controller"));
// @ts-ignore
const router = new express_1.Router();
router.post('/:id', favorite_controller_1.default.toggleFavorite);
router.get('/init/:id', favorite_controller_1.default.getFavoriteStorage);
router.get('/:id', favorite_controller_1.default.getFavorites);
exports.default = router;
