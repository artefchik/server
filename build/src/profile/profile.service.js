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
const profile_model_1 = require("./profile.model");
const user_service_1 = __importDefault(require("../user/user.service"));
const profile_dto_1 = require("./profile.dto");
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
class ProfileService {
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield profile_model_1.ProfileModel.findById(userId);
            if (!profile) {
                throw ApiError_1.default.badRequest('Profile not found');
            }
            const profileDto = new profile_dto_1.ProfileDto(profile);
            const user = yield user_service_1.default.getOne(profileDto.id);
            return Object.assign(Object.assign({}, profileDto), { user: user });
        });
    }
    createProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield profile_model_1.ProfileModel.create({ _id: new mongodb_1.ObjectId(id) });
            return profile;
        });
    }
    updateProfile(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProfile = yield profile_model_1.ProfileModel.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: Object.assign({}, data) }, { new: true });
            if (!updatedProfile) {
                throw ApiError_1.default.badRequest('The data could not be updated .Try again please.');
            }
            const profileDto = new profile_dto_1.ProfileDto(updatedProfile);
            const user = yield user_service_1.default.getOne(profileDto.id);
            return Object.assign(Object.assign({}, profileDto), { user });
        });
    }
}
exports.default = new ProfileService();
