"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const password_manager_service_1 = require("./password-manager.service");
const password_manager_resolver_1 = require("./password-manager.resolver");
const users_module_1 = require("../../../modules/users/users.module");
const password_module_1 = require("../password/password.module");
let PasswordManagerModule = class PasswordManagerModule {
};
PasswordManagerModule = __decorate([
    common_1.Module({
        imports: [users_module_1.UsersModule, password_module_1.PasswordModule],
        providers: [password_manager_service_1.PasswordManagerService, password_manager_resolver_1.PasswordManagerResolver],
    })
], PasswordManagerModule);
exports.PasswordManagerModule = PasswordManagerModule;
//# sourceMappingURL=password-manager.module.js.map