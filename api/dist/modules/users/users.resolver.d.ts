import { UsersService } from './users.service';
import { GraphqlContext } from '../../types/app/GraphqlContext';
import { UserInput, Permission, User } from '../../types/Api';
import { PermissionsService } from '../auth/permissions/permissions.service';
export declare class UserResolver {
    private users;
    private permissions;
    constructor(users: UsersService, permissions: PermissionsService);
    getUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    signedInUser({ user }: GraphqlContext): Promise<User>;
    createUser({ email, firstName, lastName, }: UserInput): Promise<User>;
    modifyUser(id: string, { email, firstName, lastName }: UserInput): Promise<User>;
    deactivateUser(id: string): Promise<User>;
    reactivateUser(id: string): Promise<User>;
    getPermissions({ id }: User): Promise<Permission[]>;
}
