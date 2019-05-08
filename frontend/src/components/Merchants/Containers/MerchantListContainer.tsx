import { Query } from 'react-apollo'
import { GetLoggedInUserMerchants } from '../../../graphql/queries/GetLoggedInUserMerchants'
import React, { FC } from 'react'
import { Merchant } from '../../../types/Api'
import Row from 'reactstrap/lib/Row'
import { MerchantList } from '../Components/MerchantList'
import { withRouter } from 'react-router-dom'

const MerchantListContainer: FC = () => {
  return (
    <Query<{ getLoggedInUserMerchants: Merchant[] }>
      query={GetLoggedInUserMerchants}
    >
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`
        if (!data) return <h5> No Merchant </h5>

        return (
          <Row>
            <MerchantList merchants={data.getLoggedInUserMerchants} />
          </Row>
        )
      }}
    </Query>
  )
}

export default withRouter(MerchantListContainer)
