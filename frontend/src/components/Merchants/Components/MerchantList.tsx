import React, { FC } from 'react'
import { MerchantCard } from './MerchantCard'
import { Merchant } from '../../../types/Api'
import { Col } from 'reactstrap'

interface MerchantListProps {
  merchants: Merchant[] | undefined
}

export const MerchantList: FC<MerchantListProps> = ({ merchants }) => {
  if (!merchants || merchants.length === 0) return <h5> No Merchant </h5>

  return (
    <>
      {merchants.map(merchant => (
        <Col xs={12} sm={4} className="mb-2" key={merchant.id}>
          <MerchantCard merchant={merchant} />
        </Col>
      ))}
    </>
  )
}
