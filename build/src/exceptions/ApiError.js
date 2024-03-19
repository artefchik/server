"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
    static badRequest(message) {
        return new ApiError(400, message);
    }
    static unauthorized() {
        return new ApiError(401, 'пользователь не авторизован');
    }
}
exports.default = ApiError;
