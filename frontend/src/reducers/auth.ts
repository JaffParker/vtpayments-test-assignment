import { ActionWithPayload, Action } from './actionTypings'
import { User } from '../types/Api'

export enum AuthActionType {
  SignIn = 'SIGN_IN',
  SignOut = 'SIGN_OUT',
}

export type AuthAction = SignInAction | SignOutAction

export interface SignInPayload {
  token: string
  user: User
}
export type SignInAction = ActionWithPayload<
  AuthActionType.SignIn,
  SignInPayload
>
export const signIn = (user: User, token: string): SignInAction => ({
  type: AuthActionType.SignIn,
  payload: {
    user,
    token,
  },
})

export type SignOutAction = Action<AuthActionType.SignOut>
export const signOut = (): SignOutAction => ({
  type: AuthActionType.SignOut,
})

export interface GuestAuthState {
  isSignedIn: false
}
export interface UserAuthState {
  isSignedIn: true
  token: string
  user: User
}
export type AuthState = GuestAuthState | UserAuthState
const defaultState: AuthState = {
  isSignedIn: false,
}

export const auth = (state = defaultState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.SignIn:
      return {
        isSignedIn: true,
        ...action.payload,
      }

    case AuthActionType.SignOut:
      return defaultState

    default:
      return state
  }
}
