"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_service_1 = require("./jwt/jwt.service");
const password_service_1 = require("./password/password.service");
const jwt_errors_1 = require("./jwt/jwt.errors");
const InputError_1 = require("../../errors/InputError");
const SignInErrors_1 = require("../../types/Errors/SignInErrors");
const TokenErrors_1 = require("../../types/Errors/TokenErrors");
let AuthService = class AuthService {
    constructor(users, jwt, password) {
        this.users = users;
        this.jwt = jwt;
        this.password = password;
    }
    getUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.users.getByEmail(email);
            if (!user) {
                throw new InputError_1.InputError(SignInErrors_1.SignInErrors.UserNotFound);
            }
            if (!user.password) {
                throw new InputError_1.InputError(SignInErrors_1.SignInErrors.PasswordNotSet);
            }
            if (!(yield this.password.compare(user.password, password))) {
                throw new InputError_1.InputError(SignInErrors_1.SignInErrors.PasswordInvalid);
            }
            return user;
        });
    }
    getTokenForUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jwt.createToken(user.id);
        });
    }
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenPayload = yield this.jwt.parseToken(token);
                return yield this.users.getById(tokenPayload.sub);
            }
            catch (error) {
                if (error instanceof jwt_errors_1.TokenExpiredError) {
                    throw new InputError_1.InputError(TokenErrors_1.TokenErrors.TokenExpired);
                }
                else if (error instanceof jwt_errors_1.TokenInvalidError) {
                    throw new InputError_1.InputError(TokenErrors_1.TokenErrors.TokenInvalid);
                }
                else {
                    throw error;
                }
            }
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_service_1.JwtService,
        password_service_1.PasswordService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map