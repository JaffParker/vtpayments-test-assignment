import React, { FC } from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import { DocumentTitle } from '../Misc/DocumentTitle'
import { LayoutContainer } from '../Layout/Containers/LayoutContainer'
import { MainRouter } from '../Routers/MainRouter'

export const App: FC = () => (
  <DocumentTitle defaultTitle="VTPayments">
    <LayoutContainer>
      <MainRouter />
    </LayoutContainer>
  </DocumentTitle>
)
