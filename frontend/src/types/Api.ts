/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum MerchantCustomerType {
  individual = 'individual',
  organization = 'organization',
}

export enum MerchantStatusEnum {
  pending = 'pending',
  active = 'active',
  inactive = 'inactive',
  collection = 'collection',
}

export enum PaymentRequestStatus {
  pending = 'pending',
  paid = 'paid',
  attempted = 'attempted',
}

export enum PaymentRequestType {
  request = 'request',
  direct = 'direct',
}

export enum TransactionResult {
  success = 'success',
  failed = 'failed',
}

export interface AddressInput {
  country: string
  state: string
  city: string
  address: string
  zipCode: string
}

export interface CreditCardInput {
  holder: string
  number: string
  expMonth: string
  expYear: string
  cvc: string
}

export interface MerchantContactInfoInput {
  phone: string
  address: AddressInput
}

export interface MerchantCustomerContactInfoInput {
  email?: string
  phone?: string
  address?: AddressInput
}

export interface MerchantCustomerInput {
  name: string
  type: MerchantCustomerType
  contactInfo: MerchantCustomerContactInfoInput
}

export interface MerchantGatewayInput {
  gatewayId: string
  merchantId: string
  currencyId: string
  nickname?: string
  credentials: Object
}

export interface MerchantInput {
  name: string
  contactInfo: MerchantContactInfoInput
  isReseller: boolean
  resellerId?: string
}

export interface MerchantWhiteLabelOptionsInput {
  themeColor?: string
  logo?: Upload
}

export interface ModifyMerchantInput {
  name: string
  contactInfo: MerchantContactInfoInput
}

export interface PaymentInput {
  paymentRequestId: string
  cc: CreditCardInput
}

export interface PaymentRequestInput {
  merchantGatewayId: string
  merchantCustomerId: string
  amount: string
  note?: string
  dueBy: Date
  type: PaymentRequestType
}

export interface SetUserPasswordInput {
  id: string
  password: string
}

export interface SignInInput {
  email: string
  password: string
}

export interface UserInput {
  email: string
  firstName: string
  lastName: string
  merchantId: string
}

export interface Address {
  country: string
  state: string
  city: string
  address: string
  zipCode: string
}

export interface Auth {
  token: string
  user: User
}

export interface Currency {
  id: string
  code: string
  name: string
}

export interface DeletedResponse {
  type: string
  id: string
}

export interface EmailConfirmation {
  userId: string
  email: string
}

export interface Gateway {
  id: string
  name: string
  fields: GatewayCredentialsField[]
}

export interface GatewayCredentialsField {
  name: string
  label: string
}

export interface Image {
  id: string
  mimetype: string
  path: string
  uploadedAt: Date
}

export interface Merchant {
  id: string
  name: string
  contactInfo: MerchantContactInfo
  whiteLabelOptions?: MerchantWhiteLabelOptions
  status: MerchantStatusEnum
  isReseller: boolean
  parentResellerId: string
  users?: User[]
  usersCount: number
  gateways?: MerchantGateway[]
  manager: User
  primaryContact?: User
}

export interface MerchantContactInfo {
  phone: string
  address: Address
}

export interface MerchantCustomer {
  id: string
  name: string
  type: MerchantCustomerType
  contactInfo: MerchantCustomerContactInfo
}

export interface MerchantCustomerContactInfo {
  email?: string
  phone?: string
  address?: Address
}

export interface MerchantGateway {
  id: string
  nickname: string
  isActive: boolean
  gateway: Gateway
  currency: Currency
}

export interface MerchantWhiteLabelOptions {
  themeColor?: string
  logo?: Image
}

export interface IMutation {
  signIn(input: SignInInput): Auth | Promise<Auth>
  uploadImage(image: Upload): Image | Promise<Image>
  createMerchant(input: MerchantInput): Merchant | Promise<Merchant>
  modifyMerchant(
    id: string,
    input: ModifyMerchantInput,
  ): Merchant | Promise<Merchant>
  modifyMerchantWhiteLabelOptions(
    id: string,
    input: MerchantWhiteLabelOptionsInput,
  ): Merchant | Promise<Merchant>
  assignMerchantManager(
    id: string,
    managerUserId: string,
  ): Merchant | Promise<Merchant>
  assignMerchantPrimaryContact(
    id: string,
    contactUserId: string,
  ): Merchant | Promise<Merchant>
  updateMerchantStatus(
    id: string,
    status?: MerchantStatusEnum,
  ): Merchant | Promise<Merchant>
  addGatewayToMerchant(
    input: MerchantGatewayInput,
  ): MerchantGateway | Promise<MerchantGateway>
  deactivateGateway(id: string): MerchantGateway | Promise<MerchantGateway>
  activateGateway(id: string): MerchantGateway | Promise<MerchantGateway>
  authorizePayment(input: PaymentInput): Transaction | Promise<Transaction>
  emailReceipt(transactionId: string): boolean | Promise<boolean>
  createPaymentRequest(
    input?: PaymentRequestInput,
  ): PaymentRequest | Promise<PaymentRequest>
  createUser(input: UserInput): User | Promise<User>
  modifyUser(id: string, input: UserInput): User | Promise<User>
  deactivateUser(id: string): User | Promise<User>
  reactivateUser(id: string): User | Promise<User>
  confirmEmail(token: string): EmailConfirmation | Promise<EmailConfirmation>
  resendConfirmationEmail(userId: string): boolean | Promise<boolean>
  setUserPassword(input: SetUserPasswordInput): boolean | Promise<boolean>
  createMerchantCustomer(
    merchantId: string,
    input: MerchantCustomerInput,
  ): MerchantCustomer | Promise<MerchantCustomer>
  modifyMerchantCustomer(
    id: string,
    input: MerchantCustomerInput,
  ): MerchantCustomer | Promise<MerchantCustomer>
  removeMerchantCustomer(id: string): DeletedResponse | Promise<DeletedResponse>
}

export interface PaymentRequest {
  id: string
  amount: string
  note?: string
  requestedAt: Date
  dueBy: Date
  status: PaymentRequestStatus
  type: PaymentRequestType
  merchantGateway: MerchantGateway
  sender: User
  merchantCustomer: MerchantCustomer
  transactions?: Transaction[]
}

export interface Permission {
  id: string
  code: string
  name: string
  description: string
}

export interface IQuery {
  currencies(): Currency[] | Promise<Currency[]>
  gateways(): Gateway[] | Promise<Gateway[]>
  merchants(
    resellerId?: string,
    resellers?: boolean,
    searchString?: string,
  ): Merchant[] | Promise<Merchant[]>
  merchantById(id: string): Merchant | Promise<Merchant>
  merchantGateways(
    merchantId: string,
    onlyActive?: boolean,
  ): MerchantGateway[] | Promise<MerchantGateway[]>
  paymentRequests(
    merchantId?: string,
    status?: PaymentRequestStatus,
    type?: PaymentRequestType,
  ): PaymentRequest[] | Promise<PaymentRequest[]>
  paymentRequest(id: string): PaymentRequest | Promise<PaymentRequest>
  paymentRequestByHash(hash: string): PaymentRequest | Promise<PaymentRequest>
  users(merchantId?: string): User[] | Promise<User[]>
  getUserById(id: string): User | Promise<User>
  signedInUser(): User | Promise<User>
  getPermissions(): Permission[] | Promise<Permission[]>
  getPermissionsForUser(userId: string): Permission[] | Promise<Permission[]>
  merchantCustomers(
    merchantId?: string,
    searchString?: string,
  ): MerchantCustomer[] | Promise<MerchantCustomer[]>
  customerById(id: string): MerchantCustomer | Promise<MerchantCustomer>
  temp__(): boolean | Promise<boolean>
}

export interface Transaction {
  id: string
  paymentRequestId: string
  result: TransactionResult
  message?: string
  receiptHTML: string
}

export interface User {
  id: string
  email: string
  active: boolean
  emailConfirmed: boolean
  isPrimaryContact: boolean
  profile: UserProfile
  merchant: Merchant
  permissions?: Permission[]
}

export interface UserProfile {
  firstName: string
  lastName: string
}

export type Object = any
export type Upload = any
