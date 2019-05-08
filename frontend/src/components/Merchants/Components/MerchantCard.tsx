import { Merchant } from '../../../types/Api'
import React, { FC } from 'react'
import Card from 'reactstrap/lib/Card'
import CardTitle from 'reactstrap/lib/CardTitle'
import CardText from 'reactstrap/lib/CardText'

interface MerchantCardProps {
  merchant: Merchant
}

export const MerchantCard: FC<MerchantCardProps> = ({ merchant }) => {
  return (
    <Card body>
      <CardTitle>{merchant.name}</CardTitle>
      <CardText>Merchant id: {merchant.id}</CardText>
    </Card>
  )
}
