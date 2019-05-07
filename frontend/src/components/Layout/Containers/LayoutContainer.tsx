import React, { Fragment } from 'react'
import { withRouter } from 'react-router'
import { Container } from 'reactstrap'
import { UserMenuContainer } from './UserMenuContainer'
import { Navbar } from '../Views/Navbar'

export const LayoutContainer = withRouter(
  ({ location: { pathname }, children }) => (
    <Fragment>
      <Navbar location={pathname} UserMenu={UserMenuContainer} />
      <Container>{children}</Container>
    </Fragment>
  ),
)
