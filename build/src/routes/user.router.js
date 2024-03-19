"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = __importDefault(require("../user/user.controller"));
const upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
// @ts-ignore
const router = new express_1.Router();
router.post('/registration', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 4, max: 32 }), user_controller_1.default.registration);
router.post('/login', user_controller_1.default.login);
router.post('/logout', user_controller_1.default.logout);
router.get('/refresh', user_controller_1.default.refresh);
router.post('/upload', upload_middleware_1.default.single('avatar'), user_controller_1.default.changeAvatar);
exports.default = router;
