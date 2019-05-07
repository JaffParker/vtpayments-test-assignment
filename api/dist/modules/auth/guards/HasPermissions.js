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
const graphql_1 = require("@nestjs/graphql");
const apollo_server_core_1 = require("apollo-server-core");
const ServerErrors_1 = require("../../../types/Errors/ServerErrors");
const permissions_service_1 = require("../permissions/permissions.service");
const core_1 = require("@nestjs/core");
let HasPermissions = class HasPermissions {
    constructor(userPermissions, reflector) {
        this.userPermissions = userPermissions;
        this.reflector = reflector;
    }
    canActivate(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = graphql_1.GqlExecutionContext.create(ctx).getContext();
            if (!context)
                return true;
            const { isSignedIn, user } = context;
            const roles = this.reflector.get('roles', ctx.getHandler());
            if (!roles)
                return true;
            if (isSignedIn &&
                user &&
                (yield this.userPermissions.userHasPermissions(user.id, roles)))
                return true;
            throw new apollo_server_core_1.ForbiddenError(ServerErrors_1.ServerErrors.Unauthorized);
        });
    }
};
HasPermissions = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService,
        core_1.Reflector])
], HasPermissions);
exports.HasPermissions = HasPermissions;
//# sourceMappingURL=HasPermissions.js.map