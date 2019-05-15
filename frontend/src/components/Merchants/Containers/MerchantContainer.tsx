import { Query } from 'react-apollo'
import React, { FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Merchant } from '../../../types/Api'
import { getMerchantsByUser } from '../../../graphql/queries/GetMerchantsByUser'

const MerchantContainer: FC<RouteComponentProps> = () => {
  return (
    <Query<{ getMerchantsByUser: Merchant[] }> query={getMerchantsByUser}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`
        return data ? (
          data.getMerchantsByUser.length ? (
            <ul>
              {data.getMerchantsByUser.map(merchant => (
                <li key={merchant.id}>Merchant name: {merchant.name}</li>
              ))}
            </ul>
          ) : (
            <h5> There are no merchants for this user</h5>
          )
        ) : (
          <h5> There was an error retrieving the merchant data.</h5>
        )
      }}
    </Query>
  )
}
export default withRouter(MerchantContainer)
