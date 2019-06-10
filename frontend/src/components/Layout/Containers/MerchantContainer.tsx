import React, { FC, useContext } from 'react'
import { Mutation } from 'react-apollo'

import {
  AuthContext,
  UserAuthContextState,
} from '../../../contexts/AuthContext'
import { MerchantInput, Merchant } from '../../../types/Api'
import { CreateMerchant } from '../../../graphql/mutations/CreateMerchant'
import { MerchantForm, MerchantFormValues } from '../Views/MerchantForm'

export const MerchantContainer: FC = () => {
  const {
    user: {
      merchant: { id: resellerId },
    },
  } = useContext(AuthContext) as UserAuthContextState
  return (
    <Mutation<{ createMerchant: Merchant }, { input: MerchantInput }>
      mutation={CreateMerchant}
    >
      {(createMerchant, { loading }) => {
        const onSubmit = (values: MerchantFormValues): void => {
          const {
            country,
            state,
            city,
            address,
            zipCode,
            phone,
            ...rest
          } = values
          const data = {
            ...rest,
            resellerId,
            contactInfo: {
              phone,
              address: {
                country,
                state,
                city,
                address,
                zipCode,
              },
            },
          }
          createMerchant({ variables: { input: data } })
        }
        return <MerchantForm submitting={loading} onSubmit={onSubmit} />
      }}
    </Mutation>
  )
}
