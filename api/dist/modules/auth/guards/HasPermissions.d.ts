import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PermissionsService } from '../permissions/permissions.service';
import { Reflector } from '@nestjs/core';
export declare class HasPermissions implements CanActivate {
    private userPermissions;
    private reflector;
    constructor(userPermissions: PermissionsService, reflector: Reflector);
    canActivate(ctx: ExecutionContext): Promise<boolean>;
}
