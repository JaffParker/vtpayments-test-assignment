"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const password_module_1 = require("./password/password.module");
const jwt_module_1 = require("./jwt/jwt.module");
const auth_service_1 = require("./auth.service");
const users_module_1 = require("../users/users.module");
const auth_resolver_1 = require("./auth.resolver");
const password_manager_module_1 = require("./password-manager/password-manager.module");
const email_verifier_module_1 = require("./email-verifier/email-verifier.module");
const permissions_module_1 = require("./permissions/permissions.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [password_module_1.PasswordModule, jwt_module_1.JwtModule, users_module_1.UsersModule, password_manager_module_1.PasswordManagerModule, email_verifier_module_1.EmailVerifierModule, permissions_module_1.PermissionsModule],
        providers: [auth_service_1.AuthService, auth_resolver_1.AuthResolver],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map