"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basket_service_1 = __importDefault(require("./basket.service"));
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
class BasketController {
    addProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: basketId } = req.params;
                const { productId, user } = req.body;
                if (!basketId || !productId) {
                    return next(ApiError_1.default.badRequest('Failed to add'));
                }
                const addedProduct = yield basket_service_1.default.addProduct(basketId, productId);
                res.json(addedProduct);
            }
            catch (e) {
                next(e);
            }
        });
    }
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { productId } = req.query;
                if (!id || !productId) {
                    return next(ApiError_1.default.badRequest('Incorrect data'));
                }
                const deletedProduct = yield basket_service_1.default.deleteProduct(id, productId);
                res.json(deletedProduct);
            }
            catch (e) {
                next(e);
            }
        });
    }
    deleteAllProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return next(ApiError_1.default.badRequest('Incorrect data'));
                }
                const deletedProduct = yield basket_service_1.default.deleteAllProduct(id);
                res.json(deletedProduct);
            }
            catch (e) {
                next(e);
            }
        });
    }
    updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { count, productId } = req.body;
                if (!id || !req.body) {
                    return next(ApiError_1.default.badRequest('Incorrect data'));
                }
                const updatedProduct = yield basket_service_1.default.updateCountProduct(id, productId, count);
                res.json(updatedProduct);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const products = yield basket_service_1.default.getProducts(id);
                res.json(products);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getBasket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: userId } = req.params;
                const products = yield basket_service_1.default.getBasket(userId);
                res.json(products);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new BasketController();
