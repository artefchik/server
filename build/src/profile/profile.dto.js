"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileDto = void 0;
class ProfileDto {
    constructor(data) {
        this.id = data._id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.age = data.age;
    }
}
exports.ProfileDto = ProfileDto;
