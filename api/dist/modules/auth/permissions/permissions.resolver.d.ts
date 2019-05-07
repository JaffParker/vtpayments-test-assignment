import { PermissionsService } from './permissions.service';
import { Permission } from '../../../types/Api';
export declare class PermissionsResolver {
    private permissions;
    constructor(permissions: PermissionsService);
    getPermissions(): Promise<Permission[]>;
    getPermissionsForUser(userId: string): Promise<Permission[]>;
    grantPermissionToUser(userId: string, permissionId: string): Promise<void>;
    revokePermission(userId: string, permissionId: string): Promise<void>;
}
