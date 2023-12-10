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
class UserController {
    constructor(userFacade) {
        this.userFacade = userFacade;
    }
    signInUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            try {
                const result = yield this.userFacade.signIn(user);
                res.json(result);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    error: "Internal Server Error",
                });
            }
            finally {
                //connection.end();
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const result = yield this.userFacade.loginUser(email, password);
                res.json(result);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            }
            finally {
                //connection.end();
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, newPassword } = req.body;
            try {
                const result = yield this.userFacade.updateUser(user, newPassword);
                res.json(result);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            }
            finally {
                //connection.end();
            }
        });
    }
    getUserFromToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const headerToken = req.headers["authorization"];
            if (headerToken) {
                const bearerToken = headerToken.split(" ");
                const result = yield this.userFacade.getUserFromToken(bearerToken[1]);
                res.json(result);
            }
            else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.default = UserController;
