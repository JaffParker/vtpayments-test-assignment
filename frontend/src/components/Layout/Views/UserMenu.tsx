import React, { FC } from 'react'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { Icon } from '../../Misc/Icon'
import { Link } from 'react-router-dom'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt'

export interface UserMenuProps {
  userName: string
  signOut: () => void
}

export const UserMenu: FC<UserMenuProps> = ({ userName, signOut }) => (
  <UncontrolledDropdown nav inNavbar>
    <DropdownToggle nav caret>
      {userName}
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem tag={Link} to="/" onClick={() => signOut()}>
        <Icon icon={faSignOutAlt} /> Sign Out
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
)
