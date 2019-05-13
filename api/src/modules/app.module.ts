import { Module, Logger } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService, ConfigModule } from 'nestjs-config'
import { GraphQLModule, GqlModuleOptions } from '@nestjs/graphql'
import { resolve } from 'path'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { InputError } from '../errors/InputError'
import { AuthenticationError } from 'apollo-server-core'
import { GraphqlContext } from '../types/app/GraphqlContext'
import { EventsModule } from './events/events.module'
import { MailModule } from './mail/mail.module'
import { GqlObject } from '../rootSchema/Object'
import { GqlDate } from '../rootSchema/Date'
import { APP_GUARD } from '@nestjs/core'
import { HasPermissions } from './auth/guards/HasPermissions'
import { MerchantsModule } from './merchants/merchants.module'
import { ResellersModule } from './resellers/resellers.module'

@Module({
  imports: [
    ConfigModule.load(
      resolve(
        __dirname,
        process.env.INTERP === 'js' ? '../config/*.js' : '../config/*.ts',
      ),
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
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
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      imports: [AuthModule],
      inject: [ConfigService, AuthService],
      useFactory: (
        config: ConfigService,
        auth: AuthService,
      ): GqlModuleOptions => ({
        typePaths: ['./**/*.gql'],
        resolvers: {
          Date: GqlDate,
          Object: GqlObject,
        },
        playground: !config.get('app').isProduction(),
        tracing: !config.get('app').isProduction(),

        definitions: {
          outputAs: 'interface',
          path: resolve(__dirname, '../types/Api.ts'),
        },

        context: async ({ req }): Promise<GraphqlContext> => {
          const logger = new Logger('TokenParser')

          try {
            const headerMatch = (req.header('Authorization') || '').match(
              /Bearer (.*)/,
            )

            if (headerMatch)
              return {
                isSignedIn: true,
                user: await auth.getUserByToken(headerMatch[1]),
              }

            return { isSignedIn: false }
          } catch (error) {
            if (error instanceof InputError) {
              throw new AuthenticationError(error.message)
            } else {
              logger.error(error.message, error.stack)

              return {
                isSignedIn: false,
              }
            }
          }
        },
      }),
    }),
    EventsModule,
    MailModule,
    UsersModule,
    AuthModule,
    MerchantsModule,
    ResellersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: HasPermissions,
    },
  ],
})
export class AppModule {}
