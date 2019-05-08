import React, { FC } from 'react'
import { ResellerCard } from './ResellerCard'
import { Reseller } from '../../../types/Api'
import { Col, Row } from 'reactstrap'

interface ResellerListProps {
  resellers: Reseller[] | undefined
}

export const ResellerList: FC<ResellerListProps> = ({ resellers }) => {
  if (!resellers || resellers.length === 0) return <h5> No Reseller </h5>

  return (
    <Row>
      {resellers.map(reseller => (
        <Col xs={12} sm={4} className="mb-2" key={reseller.id}>
          <ResellerCard reseller={reseller} />
        </Col>
      ))}
    </Row>
  )
}
