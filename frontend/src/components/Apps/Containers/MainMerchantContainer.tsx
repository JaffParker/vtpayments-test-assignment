import React, { FC, Fragment, useContext, useState } from 'react'
import { EditMerchantContainer } from '../../Merchants/Container/EditMerchantContainer'
import { CreateMerchantContainer } from '../../Merchants/Container/CreateMerchantContainer'
import '../../../sass/main.scss'

export const MainMerchantContainer: FC = () => {
  return (
    <Fragment>
      <CreateMerchantContainer />
      <EditMerchantContainer />
    </Fragment>
  )
}
