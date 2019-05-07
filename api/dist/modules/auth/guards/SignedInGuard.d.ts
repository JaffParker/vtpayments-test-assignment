import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class SignedInGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
