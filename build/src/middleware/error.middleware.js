"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
// @ts-ignore
function default_1(error, req, res, next) {
    if (error instanceof ApiError_1.default) {
        return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: 'ERROR SERVER' });
}
exports.default = default_1;
;
