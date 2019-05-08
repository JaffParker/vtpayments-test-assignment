import { Query } from 'react-apollo'
import React, { FC } from 'react'
import { GetResellerById } from '../../../graphql/queries/GetResellerById'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { ResellerDetailsRouterProps } from '../../Routers/Routes/ResellerDetailRoute'
import { Reseller } from '../../../types/Api'

const ResellerDetailContainer: FC<
  RouteComponentProps<ResellerDetailsRouterProps>
> = props => {
  const id = props.match.params.resellerId

  return (
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
            <h2>{name}</h2>
            <ul>
              {merchants &&
                merchants.map(merchant => (
                  <li key={merchant.id}>{merchant.name}</li>
                ))}
            </ul>
          </div>
        )
      }}
    </Query>
  )
}

export default withRouter(ResellerDetailContainer)
