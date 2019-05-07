import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ForbiddenError } from 'apollo-server-core'
import { GraphqlContext } from '../../../types/app/GraphqlContext'
import { ServerErrors } from '../../../types/Errors/ServerErrors'

@Injectable()
export class SignedInGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const isSignedIn = GqlExecutionContext.create(context).getContext<
      GraphqlContext
    >().isSignedIn

    if (isSignedIn) {
      return true
    }

    throw new ForbiddenError(ServerErrors.MustSignIn)
  }
}
