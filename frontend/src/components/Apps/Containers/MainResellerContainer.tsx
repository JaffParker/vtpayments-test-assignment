import React, { FC, Fragment, useContext, useState } from 'react'
import '../../../sass/main.scss'
import { CreateResellerContainer } from '../../Resellers/Container/CreateResellerContainer'
import { EditResellerContainer } from '../../Resellers/Container/EditResellerContainer'

export const MainResellerContainer: FC = () => {
  return (
    <Fragment>
      <CreateResellerContainer />
      <EditResellerContainer />
    </Fragment>
  )
}
