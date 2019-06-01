import { FC, Fragment, useContext } from 'react'
import { Form } from 'informed'
import React from 'react'
import { SelectMerchantInput } from './SelectMerchantInput'
import { required } from '../../../helpers/validator'
import { MerchantForm } from '../Form/MerchantForm'
import Mutation from 'react-apollo/Mutation'
import { CreateMerchantInput } from '../../../../../api/src/types/Api'
import { CreateMerchant } from '../../../graphql/mutations/Merchant/CreateMerchant'
import { MerchantContext } from '../../../contexts/MerchantContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { UserAuthState } from '../../../reducers/auth'
import { EditMerchant } from '../../../graphql/mutations/Merchant/EditMerchant'

export const SelectEditMerchant: FC<any> = () => {
  const { editMerchant } = useContext(MerchantContext) as MerchantContext
  const { user } = useContext(AuthContext) as UserAuthState

  const changeHandler = e => {
    console.log(e.target.value)
  }

  return (
    <Form>
      <SelectMerchantInput
        selectOnChange={changeHandler}
        name="Select a merchant"
        validate={required()}
        initialValue={null}
      >
        {defaultValue => {
          console.log(defaultValue)

          return (
            <Mutation<
              { editMerchant: CreateMerchantInput },
              { input: CreateMerchantInput }
            >
              mutation={EditMerchant}
              onCompleted={({ editMerchant: merchant }) => {
                editMerchant(merchant)
              }}
            >
              {(editMerchant, { loading, error }) => {
                const onSubmit = (values: CreateMerchantInput): void => {
                  values.userId = user.id
                  editMerchant({ variables: { input: values } })
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
          )
        }}
      </SelectMerchantInput>
    </Form>
  )
}
