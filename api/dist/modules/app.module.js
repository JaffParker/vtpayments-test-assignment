"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_config_1 = require("nestjs-config");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const auth_module_1 = require("./auth/auth.module");
const auth_service_1 = require("./auth/auth.service");
const InputError_1 = require("../errors/InputError");
const apollo_server_core_1 = require("apollo-server-core");
const events_module_1 = require("./events/events.module");
const mail_module_1 = require("./mail/mail.module");
const Object_1 = require("../rootSchema/Object");
const Date_1 = require("../rootSchema/Date");
const core_1 = require("@nestjs/core");
const HasPermissions_1 = require("./auth/guards/HasPermissions");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            nestjs_config_1.ConfigModule.load(path_1.resolve(__dirname, process.env.INTERP === 'js' ? '../config/*.js' : '../config/*.ts')),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (config) => ({
                    name: 'default',
                    type: 'mysql',
                    host: config.get('db.host'),
                    port: config.get('db.port'),
                    database: config.get('db.database'),
                    username: config.get('db.username'),
                    password: config.get('db.password'),
                    synchronize: config.get('db.synchronize'),
                    logging: !config.get('app').isProduction()
                        ? ['query', 'error', 'info', 'schema', 'warn']
                        : ['error', 'warn'],
                    entities: [
                        config.get('app.interpreter') === 'js'
                            ? `${__dirname}/**/*.entity.js`
                            : `${__dirname}/**/*.entity.ts`,
                    ],
                }),
                inject: [nestjs_config_1.ConfigService],
            }),
            graphql_1.GraphQLModule.forRootAsync({
                imports: [auth_module_1.AuthModule],
                inject: [nestjs_config_1.ConfigService, auth_service_1.AuthService],
                useFactory: (config, auth) => ({
                    typePaths: ['./**/*.gql'],
                    resolvers: {
                        Date: Date_1.GqlDate,
                        Object: Object_1.GqlObject,
                    },
                    playground: !config.get('app').isProduction(),
                    tracing: !config.get('app').isProduction(),
                    definitions: {
                        outputAs: 'interface',
                        path: path_1.resolve(__dirname, '../types/Api.ts'),
                    },
                    context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                        const logger = new common_1.Logger('TokenParser');
                        try {
                            const headerMatch = (req.header('Authorization') || '').match(/Bearer (.*)/);
                            if (headerMatch)
                                return {
                                    isSignedIn: true,
                                    user: yield auth.getUserByToken(headerMatch[1]),
                                };
                            return { isSignedIn: false };
                        }
                        catch (error) {
                            if (error instanceof InputError_1.InputError) {
                                throw new apollo_server_core_1.AuthenticationError(error.message);
                            }
                            else {
                                logger.error(error.message, error.stack);
                                return {
                                    isSignedIn: false,
                                };
                            }
                        }
                    }),
                }),
            }),
            events_module_1.EventsModule,
            mail_module_1.MailModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: HasPermissions_1.HasPermissions,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map