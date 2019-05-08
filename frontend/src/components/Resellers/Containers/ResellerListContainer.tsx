import { Query } from 'react-apollo'
import { GetResellersByUser } from '../../../graphql/queries/GetResellersByUser'
import React, { FC, useContext } from 'react'
import {
  AuthContext,
  UserAuthContextState,
} from '../../../contexts/AuthContext'
import { ResellerCard } from '../Components/ResellerCard'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Reseller } from '../../../types/Api'

const ResellerListContainer: FC<RouteComponentProps> = ({ history }) => {
  const { user } = useContext(AuthContext) as UserAuthContextState

  const userId = user.id

  return (
    // TODO: Don't use any[] figure out how to regenerate Api.ts
    <Query<{ getResellersByUser: Reseller[] }>
      query={GetResellersByUser}
      variables={{ userId }}
    >
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`

        return data ? (
          <ul>
            {data.getResellersByUser.map(reseller => (
              <ResellerCard
                key={reseller.id}
                onClickRedirection={() =>
                  history.push(`/resellers/${reseller.id}`)
                }
                reseller={reseller}
              >
                {reseller.name}
              </ResellerCard>
            ))}
          </ul>
        ) : (
          <h5> No Reseller </h5>
        )
      }}
    </Query>
  )
}

export default withRouter(ResellerListContainer)
