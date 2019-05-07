import React, { FC, ReactNode } from 'react'
import { NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'

interface ItemProps {
  to: string
  label: ReactNode
  activeReference?: string
  active?: boolean
  location?: string
}

export const Item: FC<ItemProps> = ({
  to,
  location,
  activeReference = to,
  active = (location && location.startsWith(activeReference)) || false,
  label,
}) => (
  <NavItem>
    <NavLink tag={Link} to={to} active={active}>
      {label}
    </NavLink>
  </NavItem>
)
