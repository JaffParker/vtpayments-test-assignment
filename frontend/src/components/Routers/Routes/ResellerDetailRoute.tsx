import React from 'react'
import ResellerDetailContainer from '../../Resellers/Containers/ResellerDetailContainer'

export interface ResellerDetailsRouterProps {
  resellerId: string
}

export default function ResellerDetailRoute(): JSX.Element {
  return <ResellerDetailContainer />
}
