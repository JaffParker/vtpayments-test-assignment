import { Query } from 'react-apollo'
import React, { FC, useContext } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import {
  AuthContext,
  UserAuthContextState,
} from '../../../contexts/AuthContext'
import { Reseller } from '../../../types/Api'
import { GetResellersByUser } from '../../../graphql/queries/GetResellersByUser'

const ResellerContainer: FC<RouteComponentProps> = ({}) => {
  const { user } = useContext(AuthContext) as UserAuthContextState

  const userId = user.id

  return (
    <Query<{ getResellersByUser: Reseller[] }>
      query={GetResellersByUser}
      variables={{ userId }}
    >
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`

        return data ? (
          data.getResellersByUser.length ? (
            <ul>
              {data.getResellersByUser.map(reseller => (
                <li key={reseller.id}>Reseller name: {reseller.name}</li>
              ))}
            </ul>
          ) : (
            <h5> There are no resellers for this user</h5>
          )
        ) : (
          <h5> There was an error retrieving the reseller data. </h5>
        )
      }}
    </Query>
  )
}
export default withRouter(ResellerContainer)
