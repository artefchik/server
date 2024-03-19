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
const favorite_model_1 = require("./favorite.model");
const favoriteItem_model_1 = require("./favoriteItem.model");
const favoriteItem_dto_1 = require("./favoriteItem.dto");
const favorite_dto_1 = require("./favorite.dto");
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
const product_service_1 = __importDefault(require("../product/product.service"));
class FavoriteService {
    getProductDto(favorite) {
        return new favoriteItem_dto_1.FavoriteItemDto(favorite);
    }
    getFavoriteStorage(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const favoriteStorage = yield favorite_model_1.FavoriteModel.findOne({ userId: new mongodb_1.ObjectId(userId) });
            if (!favoriteStorage) {
                throw ApiError_1.default.badRequest('Not found');
            }
            return new favorite_dto_1.FavoriteDto(favoriteStorage);
        });
    }
    createFavoriteStorage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const favoriteStorage = yield favorite_model_1.FavoriteModel.create({
                userId: new mongodb_1.ObjectId(id),
            });
            return favoriteStorage;
        });
    }
    toggleFavorite(favoriteId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productInDb = yield favoriteItem_model_1.FavoriteItemModel.findOne({
                $and: [{ favoriteId }, { productId }],
            });
            if (productInDb) {
                return productInDb.deleteOne();
            }
            else {
                const favoriteItem = yield favoriteItem_model_1.FavoriteItemModel.create({
                    favoriteId,
                    productId,
                });
                return favoriteItem;
            }
        });
    }
    getFavorites(favoriteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const favoritesItems = yield favoriteItem_model_1.FavoriteItemModel.find({ favoriteId });
            const favoritesItemsDto = favoritesItems.map(favorite => this.getProductDto(favorite));
            return favoritesItemsDto;
        });
    }
    getFavoritesWithProducts(favoriteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const favoritesItems = yield favoriteItem_model_1.FavoriteItemModel.find({ favoriteId });
            function processProducts() {
                return __awaiter(this, void 0, void 0, function* () {
                    const products = [];
                    for (const favoritesItem of favoritesItems) {
                        try {
                            const product = yield product_service_1.default.getOne(String(favoritesItem.productId));
                            products.push(Object.assign(Object.assign({}, product), { favoritesItem }));
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
exports.default = new FavoriteService();
