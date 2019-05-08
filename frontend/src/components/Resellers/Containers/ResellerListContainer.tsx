import { Query } from 'react-apollo'
import { GetLoggedInUserResellers } from '../../../graphql/queries/GetLoggedInUserResellers'
import React, { FC, useContext } from 'react'
import {
  AuthContext,
  UserAuthContextState,
} from '../../../contexts/AuthContext'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Reseller } from '../../../types/Api'
import { Row } from 'reactstrap'
import { ResellerList } from '../Components/ResellerList'

const ResellerListContainer: FC<RouteComponentProps> = ({ history }) => {
  const { user } = useContext(AuthContext) as UserAuthContextState

  const userId = user.id

  return (
    <Query<{ getLoggedInUserResellers: Reseller[] }>
      query={GetLoggedInUserResellers}
      variables={{ userId }}
    >
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`
        if (!data) return <h5> No Reseller </h5>

        return (
          <Row>
            <ResellerList resellers={data.getLoggedInUserResellers} />
          </Row>
        )
      }}
    </Query>
  )
}

export default withRouter(ResellerListContainer)
