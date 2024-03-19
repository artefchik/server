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
const product_dto_1 = require("./product.dto");
const product_model_1 = require("./product.model");
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
class ProductsService {
    getProductDto(product) {
        return new product_dto_1.ProductDto(product);
    }
    getAll(query) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { category, color, brand, model } = query;
            console.log(query);
            let products;
            const limit = (_a = query.limit) !== null && _a !== void 0 ? _a : 6;
            const page = (_b = query.page) !== null && _b !== void 0 ? _b : 1;
            const order = (_c = query.order) !== null && _c !== void 0 ? _c : 'asc';
            const sort = 'price.current';
            let categoryFilter = {};
            if (category) {
                categoryFilter.category = category;
            }
            if (color) {
                categoryFilter.color = color;
            }
            if (brand) {
                categoryFilter.brand = brand;
            }
            if (model) {
                categoryFilter.title = model;
            }
            let querySort = {};
            if (order) {
                querySort["price.current"] = order;
            }
            // const conditions = Object.keys(categoryFilter).map(key => ({
            //     [key]: { $in: [categoryFilter[key]] }
            // }));
            console.log(categoryFilter, querySort);
            products = yield product_model_1.ProductModel.find(categoryFilter)
                .sort(querySort)
                .skip(page * limit - limit)
                .limit(limit);
            return products.map((product) => this.getProductDto(product));
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            const product = yield product_model_1.ProductModel.findById(id);
            if (!product) {
                throw ApiError_1.default.badRequest('Product not found');
            }
            return this.getProductDto(product);
        });
    }
}
exports.default = new ProductsService();
