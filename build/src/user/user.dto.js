"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(data) {
        this.id = data._id;
        this.email = data.email;
        this.isActivatedEmail = data.isActivatedEmail;
        this.username = data.username;
        this.roles = data.roles;
        this.avatar = data.avatar;
        this.activatedLinkEmail = data.activatedLinkEmail;
    }
}
exports.UserDto = UserDto;
