import React, { FC, Suspense, lazy } from 'react'
import { Loading } from '../Misc/Loading'
import { Switch, Route } from 'react-router'

const SignInRoute = lazy(() => import('./Routes/SignInRoute'))
const ConfirmEmailRoute = lazy(() => import('./Routes/ConfirmEmailRoute'))

export const GuestRouter: FC = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route
        path="/confirmEmail/:token"
        component={props => <ConfirmEmailRoute {...props} />}
        exact
      />

      <Route path="*" component={() => <SignInRoute />} />
    </Switch>
  </Suspense>
)
