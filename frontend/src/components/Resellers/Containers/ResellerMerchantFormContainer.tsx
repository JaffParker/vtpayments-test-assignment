import React, { Fragment, FC } from 'react'
import { Mutation } from 'react-apollo'
import { Merchant, MerchantInput } from '../../../types/Api'
import { CreateMerchant } from '../../../graphql/mutations/CreateMerchant'
import {
  MerchantFormValues,
  MerchantForm,
} from '../../Merchants/Form/MerchantForm'
import { GetResellerById } from '../../../graphql/queries/GetResellerById'

interface ResellerMerchantFormContainer {
  resellerId: string
}

export const ResellerMerchantFormContainer: FC<
  ResellerMerchantFormContainer
> = ({ resellerId }) => {
  return (
    <Mutation<{ createMerchant: Merchant }, { input: MerchantInput }>
      mutation={CreateMerchant}
      refetchQueries={[
        {
          query: GetResellerById,
          variables: { id: resellerId },
        },
      ]}
    >
      {(createMerchant, { loading, error }) => {
        const onSubmit = (values: MerchantFormValues): void => {
          values = { ...values, resellerId }
          createMerchant({ variables: { input: values } })
        }
        return (
          <Fragment>
            <h2>New Reseller</h2>
            <hr />
            <MerchantForm
              submitting={loading}
              onSubmit={onSubmit}
              error={error ? error.graphQLErrors[0].message : undefined}
            />
          </Fragment>
        )
      }}
    </Mutation>
  )
}
