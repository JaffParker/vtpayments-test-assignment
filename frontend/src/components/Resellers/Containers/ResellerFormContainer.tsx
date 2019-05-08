import React, { Fragment, FC } from 'react'
import { Mutation } from 'react-apollo'
import { ResellerFormValues, ResellerForm } from '../Forms/ResellerForm'
import { Reseller, ResellerInput } from '../../../types/Api'
import { CreateReseller } from '../../../graphql/mutations/CreateReseller'
import { GetLoggedInUserResellers } from '../../../graphql/queries/GetLoggedInUserResellers'

export const ResellerFormContainer: FC = () => {
  return (
    <Mutation<{ createReseller: Reseller }, { input: ResellerInput }>
      mutation={CreateReseller}
      refetchQueries={[{ query: GetLoggedInUserResellers }]}
    >
      {(createReseller, { loading, error }) => {
        const onSubmit = (values: ResellerFormValues): void => {
          createReseller({ variables: { input: values } })
        }
        return (
          <Fragment>
            <h2>New Reseller</h2>
            <hr />
            <ResellerForm
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
