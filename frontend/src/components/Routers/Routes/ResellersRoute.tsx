import React from 'react'
import ResellerListContainer from '../../Resellers/Containers/ResellerListContainer'
import Col from 'reactstrap/lib/Col'
import { ResellerFormContainer } from '../../Resellers/Containers/ResellerFormContainer'

export default function ResellersRoute(): JSX.Element {
  return (
    <>
      <Col sm="12" md={{ size: 6, offset: 3 }} className="mt-1">
        <ResellerFormContainer />
      </Col>
      <hr />
      <Col>
        <ResellerListContainer />
      </Col>
    </>
  )
}
