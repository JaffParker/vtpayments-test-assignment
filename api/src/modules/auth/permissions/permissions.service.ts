import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Permission } from './permissions.entity'
import { Repository, In } from 'typeorm'
import { UserPermission } from './user-permission.entity'

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
    @InjectRepository(UserPermission)
    private userPermissionRepo: Repository<UserPermission>,
  ) {}

  async getAll(): Promise<Permission[]> {
    return await this.permissionRepo.find()
  }

  async getForUser(userId: string): Promise<Permission[]> {
    const permissionIds = await this.userPermissionRepo
      .find({ userId })
      .then(userPermissions => userPermissions.map(perm => perm.permissionId))

    return permissionIds.length > 0
      ? this.permissionRepo.find({ id: In(permissionIds) })
      : []
  }

  async grantToUser(userId: string, permissionId: string): Promise<void> {
    await this.userPermissionRepo.insert({
      permissionId,
      userId,
      options: {},
    })
  }

  async revoke(userId: string, permissionId: string): Promise<void> {
    await this.userPermissionRepo.delete({ userId, permissionId })
  }

  async userHasPermissions(
    userId: string,
    permissionCodes: string[],
  ): Promise<boolean> {
    const permission = await this.permissionRepo.findOne({
      code: In(permissionCodes),
    })
    const userPermissions = await this.userPermissionRepo.find({
      userId,
      permissionId: permission.id,
    })

    return userPermissions.length === permissionCodes.length
  }
}
