import React, { FC, useReducer, useCallback, useEffect } from 'react'
import { AuthProvider } from '../../../contexts/AuthContext'
import { auth } from '../../../reducers/auth'
import {
  signOut as signOutAction,
  signIn as signInAction,
} from '../../../reducers/auth'
import { User } from '../../../types/Api'

export const AuthContextContainer: FC = ({ children }) => {
  const initialState = localStorage.getItem('authState')

  const [state, dispatch] = useReducer(
    auth,
    //@ts-ignore
    initialState ? JSON.parse(initialState) : { isSignedIn: false },
  )

  const signIn = useCallback((user: User, token: string) => {
    dispatch(signInAction(user, token))
  }, [])
  const signOut = useCallback(() => {
    dispatch(signOutAction())
  }, [])

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(state))
  }, [state])

  return (
    <AuthProvider value={{ ...state, signOut, signIn }}>
      {children}
    </AuthProvider>
  )
}
