import React, { FC, ComponentType } from 'react'
import {
  Navbar as VNavbar,
  NavbarToggler,
  UncontrolledCollapse,
  Nav,
  Container,
} from 'reactstrap'
import { NavbarBrand } from './NavbarBrand'
import { Item } from './Item'

export interface NavbarProps {
  location?: string
  UserMenu: ComponentType
}

export const Navbar: FC<NavbarProps> = ({ location, UserMenu }) => (
  <VNavbar expand="md" light className="mb-5 bg-light shadow">
    <Container>
      <NavbarBrand subscript="" location={location} />
      <NavbarToggler id="navbarToggler" />
      <UncontrolledCollapse
        toggler="#navbarToggler"
        navbar
        className="justify-content-end"
      >
        <Nav navbar>
          <Item label="Merchants" to="/merchants" />
          <Item label="Resellers" to="/resellers" />

          <UserMenu />
        </Nav>
      </UncontrolledCollapse>
    </Container>
  </VNavbar>
)
