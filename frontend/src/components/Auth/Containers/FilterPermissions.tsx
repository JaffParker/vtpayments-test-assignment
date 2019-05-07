import React, { useContext, FC, Fragment } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { UserAuthState } from '../../../reducers/auth'

interface FilterPermissionsProps {
  permissions: string[]
}

export const FilterPermissions: FC<FilterPermissionsProps> = ({
  permissions,
  children,
}) => {
  const { isSignedIn, user } = useContext(AuthContext) as UserAuthState

  return isSignedIn &&
    permissions.every(
      perm => !!user.permissions!.find(userPerm => userPerm.code === perm),
    ) ? (
    <Fragment>{children}</Fragment>
  ) : null
}
