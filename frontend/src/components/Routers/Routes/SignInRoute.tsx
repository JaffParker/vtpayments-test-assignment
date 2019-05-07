import React from 'react'
import { Container, Col } from 'reactstrap'
import { SignInContainer } from '../../Auth/Containers/SignInContainer'

export default function SignInRoute(): JSX.Element {
  return (
    <Container>
      <Col sm="12" md={{ size: 6, offset: 3 }} className="mt-5">
        <SignInContainer />
      </Col>
    </Container>
  )
}
