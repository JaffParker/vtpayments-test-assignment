import { PasswordManagerService } from './password-manager.service';
import { SetUserPasswordInput } from '../../../types/Api';
export declare class PasswordManagerResolver {
    private passwordManager;
    constructor(passwordManager: PasswordManagerService);
    setUserPassword({ id, password, }: SetUserPasswordInput): Promise<void>;
}
