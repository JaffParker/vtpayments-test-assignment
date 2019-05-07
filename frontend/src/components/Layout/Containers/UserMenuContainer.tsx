import React, { useContext, FC } from 'react'
import { UserMenu } from '../Views/UserMenu'
import {
  AuthContext,
  UserAuthContextState,
} from '../../../contexts/AuthContext'

export const UserMenuContainer: FC = () => {
  const { isSignedIn, signOut, user } = useContext(
    AuthContext,
  ) as UserAuthContextState

  return (
    <UserMenu
      userName={
        isSignedIn && user
          ? `${user.profile.firstName} ${user.profile.lastName}`
          : ''
      }
      signOut={signOut}
    />
  )
}
