import Collapsible from 'react-collapsible'
import { Fragment, useContext, useState } from 'react'
import { EditResellerInput } from '../../../../../api/src/types/Api'
import { ResellerEditForm } from '../Form/ResellerEditForm'
import React from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { UserAuthState } from '../../../reducers/auth'
import Mutation from 'react-apollo/Mutation'
import { GetResellersByUser } from '../../../graphql/queries/Reseller/GetResellersByUser'
import Query from 'react-apollo/Query'
import { MerchantContext } from '../../../contexts/MerchantContext'
import { SelectEditResellers } from '../Input/SelectEditResellers'
import { EditReseller } from '../../../graphql/mutations/Reseller/EditReseller'

export const EditResellerContainer = () => {
  const { editReseller } = useContext(MerchantContext) as MerchantContext
  const { user } = useContext(AuthContext) as UserAuthState

  const userId = user.id
  const [CurrentResellerToEdit, setCurrentResellerToEdit] = useState(0)

  const onResellerSelected = e => {
    setCurrentResellerToEdit(e.target.value)
  }

  if (CurrentResellerToEdit == 0) {
    return (
      <Collapsible trigger="Edit a Reseller">
        <Fragment>
          <SelectEditResellers
            userId={user.id}
            onResellerSelected={onResellerSelected}
          />
        </Fragment>
      </Collapsible>
    )
  } else {
    return (
      <Collapsible trigger="Edit a Reseller">
        <Fragment>
          <SelectEditResellers
            userId={user.id}
            onResellerSelected={onResellerSelected}
          />
          <Mutation<
            { editReseller: EditResellerInput },
            { input: EditResellerInput }
          >
            mutation={EditReseller}
            onCompleted={({ editReseller: merchant }) => {
              editReseller(merchant)
            }}
          >
            {(editReseller, { loading, error, data }) => {
              const onSubmit = (values: EditResellerInput): void => {
                values.userId = user.id
                values.id = CurrentResellerToEdit.toString()
                editReseller({ variables: { input: values } })
              }

              const onEditData = data
              const onEditError = error

              return (
                <Fragment>
                  <Query
                    query={GetResellersByUser}
                    variables={{ userId, resellerId: CurrentResellerToEdit }}
                  >
                    {({ loading, error, data }) => {
                      return (
                        <ResellerEditForm
                          submitting={loading}
                          onSubmit={onSubmit}
                          error={
                            onEditError
                              ? onEditError.graphQLErrors[0].message
                              : undefined
                          }
                          data={onEditData}
                        />
                      )
                    }}
                  </Query>
                </Fragment>
              )
            }}
          </Mutation>
        </Fragment>
      </Collapsible>
    )
  }
}
