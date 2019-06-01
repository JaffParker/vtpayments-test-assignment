import { FC, Fragment, useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { UserAuthState } from '../../../reducers/auth'
import { ResellerContext } from '../../../contexts/ResellerContext'
import Collapsible from 'react-collapsible'
import React from 'react'
import '../../../sass/main.scss'
import Mutation from 'react-apollo/Mutation'
import { CreateResellerInput } from '../../../../../api/src/types/Api'
import { CreateReseller } from '../../../graphql/mutations/Reseller/CreateReseller'
import { ResellerForm } from '../../Resellers/Form/ResellerForm'

export const ResellerContainer: FC = () => {
  const { createReseller } = useContext(ResellerContext) as ResellerContext
  const { user } = useContext(AuthContext) as UserAuthState
  return (
    <div>
      <Collapsible trigger="Create a new Reseller">
        <Mutation<
          { createReseller: CreateResellerInput },
          { input: CreateResellerInput }
        >
          mutation={CreateReseller}
          onCompleted={({ createReseller: merchant }) => {
            createReseller(merchant)
          }}
        >
          {(createReseller, { loading, error }) => {
            const onSubmit = (values: CreateResellerInput): void => {
              values.userId = user.id // set to user in the context
              values.isReseller = true
              createReseller({ variables: { input: values } })
            }
            return (
              <Fragment>
                <ResellerForm
                  submitting={loading}
                  onSubmit={onSubmit}
                  error={error ? error.graphQLErrors[0].message : undefined}
                />
              </Fragment>
            )
          }}
        </Mutation>
      </Collapsible>
    </div>
  )
}
