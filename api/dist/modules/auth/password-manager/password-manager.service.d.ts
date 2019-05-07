import { UsersService } from '../../../modules/users/users.service';
import { PasswordService } from '../password/password.service';
export declare class PasswordManagerService {
    private users;
    private password;
    constructor(users: UsersService, password: PasswordService);
    setPasswordForUser(userId: string, password: string): Promise<void>;
}
