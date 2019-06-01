import { UserAuthState } from '../../../reducers/auth'
import { AuthContext } from '../../../contexts/AuthContext'
import React, { FC, Fragment, useContext } from 'react'
import Mutation from 'react-apollo/Mutation'
import { MerchantContext } from '../../../contexts/MerchantContext'
import { CreateMerchant } from '../../../graphql/mutations/Merchant/CreateMerchant'
import { MerchantForm } from '../../Merchants/Form/MerchantForm'
import { CreateMerchantInput } from '../../../../../api/src/types/Api'
import Collapsible from 'react-collapsible'
import '../../../sass/main.scss'

export const MerchantContainer: FC = () => {
  const { createMerchant } = useContext(MerchantContext) as MerchantContext
  const { user } = useContext(AuthContext) as UserAuthState
  return (
    <div>
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
              values.userId = user.id // set to user in the context
              values.isReseller = false
              createMerchant({ variables: { input: values } })
            }
            return (
              <Fragment>
                <MerchantForm
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
