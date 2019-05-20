
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface AddressInput {
    country: string;
    state: string;
    city: string;
    address: string;
    zipCode: string;
}

export interface MerchantContactInfoInput {
    phone: string;
    address: AddressInput;
}

export interface MerchantInput {
    name?: string;
    isReseller?: boolean;
    resellerId: string;
    contactInfo: MerchantContactInfoInput;
}

export interface SetUserPasswordInput {
    id: string;
    password: string;
}

export interface SignInInput {
    email: string;
    password: string;
}

export interface UserInput {
    email: string;
    firstName: string;
    lastName: string;
}

export interface Address {
    country: string;
    state: string;
    city: string;
    address: string;
    zipCode: string;
}

export interface Auth {
    token: string;
    user: User;
}

export interface DeletedResponse {
    type: string;
    id: string;
}

export interface EmailConfirmation {
    userId: string;
    email: string;
}

export interface Merchant {
    id: string;
    name?: string;
    isReseller?: boolean;
    resellerId: string;
    contactInfo: MerchantContactInfo;
}

export interface MerchantContactInfo {
    phone: string;
    address: Address;
}

export interface IMutation {
    signIn(input: SignInInput): Auth | Promise<Auth>;
    createMerchant(input: MerchantInput): Merchant | Promise<Merchant>;
    createUser(input: UserInput): User | Promise<User>;
    modifyUser(id: string, input: UserInput): User | Promise<User>;
    deactivateUser(id: string): User | Promise<User>;
    reactivateUser(id: string): User | Promise<User>;
    confirmEmail(token: string): EmailConfirmation | Promise<EmailConfirmation>;
    resendConfirmationEmail(userId: string): boolean | Promise<boolean>;
    setUserPassword(input: SetUserPasswordInput): boolean | Promise<boolean>;
    grantPermissionToUser(userId: string, permissionId: string): boolean | Promise<boolean>;
    revokePermission(userId: string, permissionId: string): boolean | Promise<boolean>;
}

export interface Permission {
    id: string;
    code: string;
    name: string;
    description: string;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
    getUserById(id: string): User | Promise<User>;
    signedInUser(): User | Promise<User>;
    getPermissions(): Permission[] | Promise<Permission[]>;
    getPermissionsForUser(userId: string): Permission[] | Promise<Permission[]>;
    temp__(): boolean | Promise<boolean>;
}

export interface User {
    id: string;
    email: string;
    active: boolean;
    emailConfirmed: boolean;
    merchant?: Merchant;
    profile: UserProfile;
    permissions?: Permission[];
}

export interface UserProfile {
    firstName: string;
    lastName: string;
}

export type Date = any;
export type Object = any;
export type Upload = any;
