import { Query } from 'react-apollo'
import { GetLoggedInUserMerchants } from '../../../graphql/queries/GetLoggedInUserMerchants'
import React, { FC, useContext } from 'react'
import {
  AuthContext,
  UserAuthContextState,
} from '../../../contexts/AuthContext'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Merchant } from '../../../types/Api'

const MerchantListContainer: FC = () => {
  const { user } = useContext(AuthContext) as UserAuthContextState

  const userId = user.id

  return (
    <Query<{ getLoggedInUserMerchants: Merchant[] }>
      query={GetLoggedInUserMerchants}
    >
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`
        if (!data) return <h5> No merchants </h5>

        return (
          <ul>
            {data.getLoggedInUserMerchants.map(merchant => (
              <li key={merchant.id}>{merchant.name}</li>
            ))}
          </ul>
        )
      }}
    </Query>
  )
}

export default withRouter(MerchantListContainer)
