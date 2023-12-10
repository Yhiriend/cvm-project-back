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
Object.defineProperty(exports, "__esModule", { value: true });
class UserFacade {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    signIn(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.signIn(user);
            }
            catch (error) {
                console.error(error);
                throw new Error("Error during sign-in process");
            }
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.login(email, password);
            }
            catch (error) {
                console.error(error);
                throw new Error("Error during login process");
            }
        });
    }
    updateUser(user, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.update(user, newPassword);
            }
            catch (error) {
                console.error(error);
                throw new Error("Error during update process");
            }
        });
    }
    getUserFromToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.getUser(token);
            }
            catch (error) {
                console.error(error);
                throw new Error("Error during getUserFromToken process");
            }
        });
    }
}
exports.default = UserFacade;
