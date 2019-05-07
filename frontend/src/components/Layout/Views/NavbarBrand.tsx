import React, { FC } from 'react'
import { NavbarBrand as VNavbarBrand } from 'reactstrap'
import logo from './logo.png'

interface NavbarBrandProps {
  subscript: string
  location?: string
}

export const NavbarBrand: FC<NavbarBrandProps> = ({ subscript }) => (
  <VNavbarBrand tag="div" className="text-right" style={{ lineHeight: '90%' }}>
    <img src={logo} alt="VTPayments" style={{ marginBottom: '-5px' }} />
    <br />

    <small className="font-weight-light">{subscript}</small>
  </VNavbarBrand>
)
