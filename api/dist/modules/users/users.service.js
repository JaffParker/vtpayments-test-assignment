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
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./users.entity");
const InputError_1 = require("../../errors/InputError");
const SignUpErrors_1 = require("../../types/Errors/SignUpErrors");
const event_emitter_1 = require("../events/event-emitter");
const users_events_1 = require("./users.events");
let UsersService = class UsersService {
    constructor(userRepo, events) {
        this.userRepo = userRepo;
        this.events = events;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.findOne(id);
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.findOne({ email });
        });
    }
    userExists(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.userRepo.count(params)) > 0;
        });
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.userExists({ email: input.email }))
                throw new InputError_1.InputError(SignUpErrors_1.SignUpErrors.DuplicateUser);
            const user = yield this.userRepo.save(this.userRepo.create(input));
            this.events.emit(new users_events_1.UserCreated(), user);
            return user;
        });
    }
    update(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getById(id);
            for (let key in input) {
                if (input.hasOwnProperty(key)) {
                    user[key] = input[key];
                }
            }
            return this.userRepo.save(user);
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map