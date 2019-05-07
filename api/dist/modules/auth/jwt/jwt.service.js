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
const jwt = require("jsonwebtoken");
const nestjs_config_1 = require("nestjs-config");
const jwt_errors_1 = require("./jwt.errors");
let JwtService = class JwtService {
    constructor(config) {
        this.config = config;
    }
    createToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jwt.sign({}, this.config.get('auth.secret'), {
                expiresIn: this.config.get('auth').getTokenLifeTime(),
                issuer: this.config.get('app.name'),
                subject: String(userId),
            });
        });
    }
    parseToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.config.get('auth.secret'), {
                issuer: this.config.get('app.name'),
            }, (error, decoded) => {
                if (error) {
                    if (error instanceof jwt.TokenExpiredError) {
                        reject(new jwt_errors_1.TokenExpiredError());
                    }
                    else if (error instanceof jwt.JsonWebTokenError) {
                        reject(new jwt_errors_1.TokenInvalidError());
                    }
                    else {
                        reject(error);
                    }
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
};
JwtService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nestjs_config_1.ConfigService])
], JwtService);
exports.JwtService = JwtService;
//# sourceMappingURL=jwt.service.js.map