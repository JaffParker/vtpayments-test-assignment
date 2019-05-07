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
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const users_service_1 = require("./users.service");
const users_resolver_1 = require("./users.resolver");
const event_emitter_1 = require("../events/event-emitter");
const email_verifier_events_1 = require("../auth/email-verifier/email-verifier.events");
const permissions_module_1 = require("../auth/permissions/permissions.module");
let UsersModule = class UsersModule {
    constructor(users, events) {
        this.users = users;
        this.events = events;
    }
    onModuleInit() {
        this.events.on(new email_verifier_events_1.EmailConfirmed(), this.setEmailConfirmedForUser.bind(this));
    }
    setEmailConfirmedForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.users.update(userId, { emailConfirmed: true });
        });
    }
};
UsersModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([users_entity_1.User]), permissions_module_1.PermissionsModule],
        providers: [users_service_1.UsersService, users_resolver_1.UserResolver],
        exports: [users_service_1.UsersService],
    }),
    __metadata("design:paramtypes", [users_service_1.UsersService, event_emitter_1.EventEmitter])
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map