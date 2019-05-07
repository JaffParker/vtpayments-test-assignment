import { Permission } from './permissions.entity';
import { Repository } from 'typeorm';
import { UserPermission } from './user-permission.entity';
export declare class PermissionsService {
    private permissionRepo;
    private userPermissionRepo;
    constructor(permissionRepo: Repository<Permission>, userPermissionRepo: Repository<UserPermission>);
    getAll(): Promise<Permission[]>;
    getForUser(userId: string): Promise<Permission[]>;
    grantToUser(userId: string, permissionId: string): Promise<void>;
    revoke(userId: string, permissionId: string): Promise<void>;
    userHasPermissions(userId: string, permissionCodes: string[]): Promise<boolean>;
}
