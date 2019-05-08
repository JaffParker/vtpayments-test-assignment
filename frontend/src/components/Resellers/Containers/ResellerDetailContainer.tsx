import { Query } from 'react-apollo'
import React, { FC } from 'react'
import { GetResellerById } from '../../../graphql/queries/GetResellerById'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { ResellerDetailsRouterProps } from '../../Routers/Routes/ResellerDetailRoute'
import { Reseller } from '../../../types/Api'
import { MerchantList } from '../../Merchants/Components/MerchantList'
import { ResellerMerchantFormContainer } from './ResellerMarchantFormContainer'

const ResellerDetailContainer: FC<
  RouteComponentProps<ResellerDetailsRouterProps>
> = props => {
  const id = props.match.params.resellerId

  return (
    <>
      <Query<{ getResellerById: Reseller }>
        query={GetResellerById}
        variables={{ id }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`
          if (!data) return <h5> No Reseller Detail found</h5>

          const { name, merchants } = data.getResellerById
          return (
            <div>
              <h1 className="mb-5">{name}</h1>
              <ResellerMerchantFormContainer resellerId={id} />
              <hr />
              <h2 className="mb-3">Existing Merchants</h2>
              <MerchantList merchants={merchants} />
            </div>
          )
        }}
      </Query>
    </>
  )
}

export default withRouter(ResellerDetailContainer)
