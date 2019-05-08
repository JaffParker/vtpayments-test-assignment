import { Query } from 'react-apollo'
import { GetLoggedInUserResellers } from '../../../graphql/queries/GetLoggedInUserResellers'
import React, { FC, useContext } from 'react'
import {
  AuthContext,
  UserAuthContextState,
} from '../../../contexts/AuthContext'
import { ResellerCard } from '../Components/ResellerCard'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Reseller } from '../../../types/Api'
import { Col, Row } from 'reactstrap'

const ResellerListContainer: FC<RouteComponentProps> = ({ history }) => {
  const { user } = useContext(AuthContext) as UserAuthContextState

  const userId = user.id

  return (
    // TODO: Don't use any[] figure out how to regenerate Api.ts
    <Query<{ getLoggedInUserResellers: Reseller[] }>
      query={GetLoggedInUserResellers}
      variables={{ userId }}
    >
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`

        return data ? (
          <Row>
            {data.getLoggedInUserResellers.map(reseller => (
              <Col xs={12} sm={4} className="mb-2">
                <ResellerCard
                  key={reseller.id}
                  onClickRedirection={() =>
                    history.push(`/resellers/${reseller.id}`)
                  }
                  reseller={reseller}
                >
                  {reseller.name}
                </ResellerCard>
              </Col>
            ))}
          </Row>
        ) : (
          <h5> No Reseller </h5>
        )
      }}
    </Query>
  )
}

export default withRouter(ResellerListContainer)
