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
const mongodb_1 = require("mongodb");
const basket_model_1 = require("./basket.model");
const basketProduct_model_1 = require("./basketProduct.model");
const basketProduct_dto_1 = require("./basketProduct.dto");
const product_service_1 = __importDefault(require("../product/product.service"));
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
const basket_dto_1 = require("./basket.dto");
class BasketService {
    getBasketProductDto(basketProduct) {
        return new basketProduct_dto_1.BasketProductDto(basketProduct);
    }
    getBasket(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const basket = yield basket_model_1.BasketModel.findOne({
                userId: new mongodb_1.ObjectId(userId),
            });
            if (!basket) {
                throw ApiError_1.default.badRequest('not found');
            }
            return new basket_dto_1.BasketDto(basket);
        });
    }
    createBasket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const basket = yield basket_model_1.BasketModel.create({
                userId: new mongodb_1.ObjectId(id),
            });
            return basket;
        });
    }
    addProduct(basketId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productInDb = yield basketProduct_model_1.BasketProductModel.findOne({
                $and: [{ basketId }, { productId }],
            });
            if (productInDb) {
                productInDb.count += 1;
                yield productInDb.save();
                return this.getBasketProductDto(productInDb);
            }
            else {
                const product = yield basketProduct_model_1.BasketProductModel.create({
                    basketId,
                    productId,
                });
                return this.getBasketProductDto(product);
            }
        });
    }
    deleteProduct(basketId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield basketProduct_model_1.BasketProductModel.findOneAndDelete({ $and: [{ basketId: basketId }, { productId }] });
            return product;
        });
    }
    deleteAllProduct(basketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield basketProduct_model_1.BasketProductModel.deleteMany({ basketId });
            return products;
        });
    }
    updateCountProduct(basketId, productId, count) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield basketProduct_model_1.BasketProductModel.findOneAndUpdate({ $and: [{ basketId }, { productId }] }, { $set: { count: count } }, { new: true });
            if (!updatedProduct) {
                throw ApiError_1.default.badRequest('Count don\'t updated');
            }
            if (count === 0) {
                const product = yield basketProduct_model_1.BasketProductModel.findByIdAndDelete(productId);
                return product;
            }
            return updatedProduct;
        });
    }
    getProducts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const basketProducts = yield basketProduct_model_1.BasketProductModel.find({ basketId: id });
            function processProducts() {
                return __awaiter(this, void 0, void 0, function* () {
                    const products = [];
                    for (const basketProduct of basketProducts) {
                        try {
                            const product = yield product_service_1.default.getOne(String(basketProduct.productId));
                            const count = basketProduct.count;
                            products.push(Object.assign(Object.assign({}, product), { count }));
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                    return products;
                });
            }
            return processProducts();
        });
    }
}
exports.default = new BasketService();
