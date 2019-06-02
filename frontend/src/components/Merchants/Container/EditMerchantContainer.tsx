import Collapsible from 'react-collapsible'
import { Fragment, useContext, useState } from 'react'
import { SelectEditMerchant } from '../Input/SelectEditMerchant'
import {
  CreateMerchantInput,
  EditMerchantInput,
} from '../../../../../api/src/types/Api'
import { EditMerchant } from '../../../graphql/mutations/Merchant/EditMerchant'
import { MerchantEditForm } from '../Form/MerchantEditForm'
import React from 'react'
import { MerchantContext } from '../../../contexts/MerchantContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { UserAuthState } from '../../../reducers/auth'
import Mutation from 'react-apollo/Mutation'
import { GetMerchantsByUser } from '../../../graphql/queries/Merchant/GetMerchantsByUser'
import Query from 'react-apollo/Query'

export const EditMerchantContainer = () => {
  const { editMerchant } = useContext(MerchantContext) as MerchantContext
  const { user } = useContext(AuthContext) as UserAuthState

  const userId = user.id
  const [merchantToEdit, setMerchantToEdit] = useState(0)

  const onMerchantSelected = e => {
    setMerchantToEdit(e.target.value)
  }

  if (merchantToEdit == 0) {
    return (
      <Collapsible trigger="Edit a merchant">
        <Fragment>
          <SelectEditMerchant
            userId={user.id}
            onMerchantSelected={onMerchantSelected}
          />
        </Fragment>
      </Collapsible>
    )
  } else {
    return (
      <Collapsible trigger="Edit a merchant">
        <Fragment>
          <SelectEditMerchant
            userId={user.id}
            onMerchantSelected={onMerchantSelected}
          />
          <Mutation<
            { editMerchant: EditMerchantInput },
            { input: EditMerchantInput }
          >
            mutation={EditMerchant}
            onCompleted={({ editMerchant: merchant }) => {
              editMerchant(merchant)
            }}
          >
            {(editMerchant, { loading, error, data }) => {
              const onSubmit = (values: EditMerchantInput): void => {
                values.userId = user.id
                values.id = merchantToEdit.toString()
                editMerchant({ variables: { input: values } })
              }

              const onEditData = data
              const onEditError = error

              return (
                <Fragment>
                  <Query
                    query={GetMerchantsByUser}
                    variables={{ userId, merchantId: merchantToEdit }}
                  >
                    {({ loading, error, data }) => {
                      return (
                        <MerchantEditForm
                          initialValues={data.getMerchantsByUser}
                          submitting={loading}
                          onSubmit={onSubmit}
                          data={onEditData}
                          error={
                            onEditError
                              ? onEditError.graphQLErrors[0].message
                              : undefined
                          }
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
