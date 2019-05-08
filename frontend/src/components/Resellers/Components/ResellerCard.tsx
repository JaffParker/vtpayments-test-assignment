import React, { FC } from 'react'
import { Card, CardTitle, CardText, Button } from 'reactstrap'
import { Reseller } from '../../../types/Api'
import { Link } from 'react-router-dom'

interface ResellerCardProps {
  reseller: Reseller
}

export const ResellerCard: FC<ResellerCardProps> = ({ reseller }) => {
  return (
    <Card body>
      <CardTitle>
        <h3>{reseller.name}</h3>
      </CardTitle>
      <CardText>Reseller id: {reseller.id}</CardText>
      <Link className="btn btn-info" to={`/resellers/${reseller.id}`}>
        More details
      </Link>
    </Card>
  )
}
