import { User } from '../types/Api'
import { createContext } from 'react'
import { GuestAuthState, UserAuthState } from '../reducers/auth'

export interface GuestAuthContextState extends GuestAuthState {
  signIn: (user: User, token: string) => void
}
export interface UserAuthContextState extends UserAuthState {
  signOut: () => void
}
export type AuthContextState = GuestAuthContextState | UserAuthContextState

export const AuthContext = createContext<AuthContextState>({
  isSignedIn: false,
  signIn: () => {},
})
export const AuthProvider = AuthContext.Provider
