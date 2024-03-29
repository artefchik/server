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
const profile_service_1 = __importDefault(require("./profile.service"));
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
class ProfileController {
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const profile = yield profile_service_1.default.getById(id);
                if (!profile) {
                    return next(ApiError_1.default.badRequest('Profile not Found'));
                }
                res.json(profile);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const { id } = req.params;
                if (!body || !id) {
                    return next(ApiError_1.default.badRequest('Incorrect data'));
                }
                const updateProfile = yield profile_service_1.default.updateProfile(body, id);
                if (!updateProfile) {
                    return next(ApiError_1.default.badRequest('Incorrect data'));
                }
                // @ts-ignore
                res.json(updateProfile);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new ProfileController();
