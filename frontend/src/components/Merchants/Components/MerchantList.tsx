import React, { FC } from 'react'
import { MerchantCard } from './MerchantCard'
import { Merchant } from '../../../types/Api'
import { Col, Row } from 'reactstrap'

interface MerchantListProps {
  merchants: Merchant[]
}

export const MerchantList: FC<MerchantListProps> = ({ merchants }) => {
  if (!merchants || merchants.length === 0) return <h5> No Merchant </h5>

  return (
    <Row>
      {merchants.map(merchant => (
        <Col xs={12} sm={4} className="mb-2">
          <MerchantCard key={merchant.id} merchant={merchant} />
        </Col>
      ))}
    </Row>
  )
}
