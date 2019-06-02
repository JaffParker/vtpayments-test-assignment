import Collapsible from 'react-collapsible'
import { CreateMerchantInput } from '../../../../../api/src/types/Api'
import { CreateMerchant } from '../../../graphql/mutations/Merchant/CreateMerchant'
import { Fragment, useContext } from 'react'
import { MerchantCreateForm } from '../Form/MerchantCreateForm'
import React from 'react'
import Mutation from 'react-apollo/Mutation'
import { MerchantContext } from '../../../contexts/MerchantContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { UserAuthState } from '../../../reducers/auth'

export const CreateMerchantContainer = () => {
  const { createMerchant } = useContext(MerchantContext) as MerchantContext
  const { user } = useContext(AuthContext) as UserAuthState

  return (
    <Collapsible trigger="Create new Merchant">
      <Mutation<
        { createMerchant: CreateMerchantInput },
        { input: CreateMerchantInput }
      >
        mutation={CreateMerchant}
        onCompleted={({ createMerchant: merchant }) => {
          createMerchant(merchant)
        }}
      >
        {(createMerchant, { loading, error }) => {
          const onSubmit = (values: CreateMerchantInput): void => {
            values.userId = user.id
            values.isReseller = false
            createMerchant({ variables: { input: values } })
          }
          return (
            <Fragment>
              <MerchantCreateForm
                submitting={loading}
                onSubmit={onSubmit}
                error={error ? error.graphQLErrors[0].message : undefined}
              />
            </Fragment>
          )
        }}
      </Mutation>
    </Collapsible>
  )
}
