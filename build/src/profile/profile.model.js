"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModel = void 0;
const mongoose_1 = require("mongoose");
const ProfileSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    firstname: {
        type: String,
        default: '',
    },
    lastname: {
        type: String,
        default: '',
    },
    age: {
        type: Number,
        default: 0,
    },
});
exports.ProfileModel = (0, mongoose_1.model)('Profile', ProfileSchema);
