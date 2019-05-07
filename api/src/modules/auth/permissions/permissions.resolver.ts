import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PermissionsService } from './permissions.service'
import { Permission } from '../../../types/Api'

@Resolver()
export class PermissionsResolver {
  constructor(private permissions: PermissionsService) {}

  @Query()
  async getPermissions(): Promise<Permission[]> {
    return await this.permissions.getAll()
  }

  @Query()
  async getPermissionsForUser(
    @Args('userId') userId: string,
  ): Promise<Permission[]> {
    return await this.permissions.getForUser(userId)
  }

  @Mutation()
  async grantPermissionToUser(
    @Args('userId') userId: string,
    @Args('permissionId') permissionId: string,
  ): Promise<void> {
    return await this.permissions.grantToUser(userId, permissionId)
  }

  @Mutation()
  async revokePermission(
    @Args('userId') userId: string,
    @Args('permissionId') permissionId: string,
  ): Promise<void> {
    return await this.permissions.revoke(userId, permissionId)
  }
}
