import { Module, Global } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from './permissions.entity'
import { PermissionsService } from './permissions.service'
import { UserPermission } from './user-permission.entity'
import { PermissionsResolver } from './permissions.resolver'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Permission, UserPermission])],
  providers: [PermissionsService, PermissionsResolver],
  exports: [PermissionsService],
})
export class PermissionsModule {}
