"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = __importDefault(require("../profile/profile.controller"));
// @ts-ignore
const router = new express_1.Router();
router.get('/:id', profile_controller_1.default.getById);
router.patch('/:id', profile_controller_1.default.updateProfile);
exports.default = router;
