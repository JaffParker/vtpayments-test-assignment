import React, { FC } from 'react'
import { Card, CardTitle, CardText, Button } from 'reactstrap'
import { Reseller } from '../../../types/Api'

interface ResellerCardProps {
  reseller: Reseller
  onClickRedirection: () => void
}

export const ResellerCard: FC<ResellerCardProps> = ({
  reseller,
  onClickRedirection,
}) => {
  return (
    <Card body>
      <CardTitle>{reseller.name}</CardTitle>
      <CardText>Reseller id: {reseller.id}</CardText>
      <Button onClick={onClickRedirection}>More details</Button>
    </Card>
  )
}
