import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ForbiddenError } from 'apollo-server-core'
import { GraphqlContext } from '../../../types/app/GraphqlContext'
import { ServerErrors } from '../../../types/Errors/ServerErrors'
import { PermissionsService } from '../permissions/permissions.service'
import { Reflector } from '@nestjs/core'

@Injectable()
export class HasPermissions implements CanActivate {
  constructor(
    private userPermissions: PermissionsService,
    private reflector: Reflector,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(ctx).getContext<GraphqlContext>()
    if (!context) return true
    const { isSignedIn, user } = context
    const roles = this.reflector.get<string[]>('roles', ctx.getHandler())

    if (!roles) return true

    if (
      isSignedIn &&
      user &&
      (await this.userPermissions.userHasPermissions(user.id, roles))
    )
      return true

    throw new ForbiddenError(ServerErrors.Unauthorized)
  }
}
