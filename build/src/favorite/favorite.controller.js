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
const favorite_service_1 = __importDefault(require("./favorite.service"));
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
class FavoriteController {
    getFavoriteStorage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return next(ApiError_1.default.badRequest('Not found' + id));
                }
                const favoriteStorage = yield favorite_service_1.default.getFavoriteStorage(id);
                res.json(favoriteStorage);
            }
            catch (e) {
                next(e);
            }
        });
    }
    toggleFavorite(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: favoriteId } = req.params;
                const { productId } = req.body;
                if (!favoriteId || !productId) {
                    return next(ApiError_1.default.badRequest('Failed to add'));
                }
                const favorite = yield favorite_service_1.default.toggleFavorite(favoriteId, productId);
                res.json(favorite);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getFavorites(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: favoriteId } = req.params;
                const products = yield favorite_service_1.default.getFavorites(favoriteId);
                res.json(products);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getFavoritesWithProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: favoriteId } = req.params;
                const products = yield favorite_service_1.default.getFavoritesWithProducts(favoriteId);
                res.json(products);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new FavoriteController();
