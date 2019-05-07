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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const SignedInGuard_1 = require("../auth/guards/SignedInGuard");
const users_service_1 = require("./users.service");
const InputError_1 = require("../../errors/InputError");
const apollo_server_core_1 = require("apollo-server-core");
const permissions_service_1 = require("../auth/permissions/permissions.service");
let UserResolver = class UserResolver {
    constructor(users, permissions) {
        this.users = users;
        this.permissions = permissions;
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.users.getAll();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.users.getById(id);
        });
    }
    signedInUser({ user }) {
        return __awaiter(this, void 0, void 0, function* () {
            return user;
        });
    }
    createUser({ email, firstName, lastName, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.users.create({
                    email,
                    profile: { firstName, lastName },
                });
            }
            catch (error) {
                if (error instanceof InputError_1.InputError) {
                    throw new apollo_server_core_1.UserInputError(error.message);
                }
                else {
                    throw error;
                }
            }
        });
    }
    modifyUser(id, { email, firstName, lastName }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.users.update(id, {
                email,
                profile: { firstName, lastName },
            });
        });
    }
    deactivateUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.users.update(id, { active: false });
        });
    }
    reactivateUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.users.update(id, { active: true });
        });
    }
    getPermissions({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.permissions.getForUser(id);
        });
    }
};
__decorate([
    graphql_1.Query('users'),
    common_1.UseGuards(SignedInGuard_1.SignedInGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserById", null);
__decorate([
    graphql_1.Query(),
    common_1.UseGuards(SignedInGuard_1.SignedInGuard),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signedInUser", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(SignedInGuard_1.SignedInGuard),
    __param(0, graphql_1.Args('id')),
    __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "modifyUser", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(SignedInGuard_1.SignedInGuard),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deactivateUser", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(SignedInGuard_1.SignedInGuard),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "reactivateUser", null);
__decorate([
    graphql_1.ResolveProperty('permissions'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getPermissions", null);
UserResolver = __decorate([
    graphql_1.Resolver('User'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        permissions_service_1.PermissionsService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=users.resolver.js.map