"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivatedEmail: { type: Boolean, default: false },
    activatedLinkEmail: { type: String },
    avatar: { type: String, default: '' },
    roles: {
        type: [String],
        default: 'user',
    },
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
