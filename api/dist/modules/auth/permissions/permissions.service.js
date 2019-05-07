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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const permissions_entity_1 = require("./permissions.entity");
const typeorm_2 = require("typeorm");
const user_permission_entity_1 = require("./user-permission.entity");
let PermissionsService = class PermissionsService {
    constructor(permissionRepo, userPermissionRepo) {
        this.permissionRepo = permissionRepo;
        this.userPermissionRepo = userPermissionRepo;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.permissionRepo.find();
        });
    }
    getForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const permissionIds = yield this.userPermissionRepo
                .find({ userId })
                .then(userPermissions => userPermissions.map(perm => perm.permissionId));
            return permissionIds.length > 0
                ? this.permissionRepo.find({ id: typeorm_2.In(permissionIds) })
                : [];
        });
    }
    grantToUser(userId, permissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userPermissionRepo.insert({
                permissionId,
                userId,
                options: {},
            });
        });
    }
    revoke(userId, permissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userPermissionRepo.delete({ userId, permissionId });
        });
    }
    userHasPermissions(userId, permissionCodes) {
        return __awaiter(this, void 0, void 0, function* () {
            const permission = yield this.permissionRepo.findOne({
                code: typeorm_2.In(permissionCodes),
            });
            const userPermissions = yield this.userPermissionRepo.find({
                userId,
                permissionId: permission.id,
            });
            return userPermissions.length === permissionCodes.length;
        });
    }
};
PermissionsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(permissions_entity_1.Permission)),
    __param(1, typeorm_1.InjectRepository(user_permission_entity_1.UserPermission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PermissionsService);
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map