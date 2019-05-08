import React, { FC, lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router'
import { Loading } from '../Misc/Loading'

const HomeRoute = lazy(() => import('./Routes/HomeRoute'))
const ResellersRoute = lazy(() => import('./Routes/ResellersRoute'))
const ResellerDetailRoute = lazy(() => import('./Routes/ResellerDetailRoute'))
const MerchantsRoute = lazy(() => import('./Routes/MerchantsRoute'))

export const MainRouter: FC = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route path="/" component={props => <HomeRoute {...props} />} exact />
      <Route
        path="/merchants"
        component={props => <MerchantsRoute {...props} />}
        exact
      />
      <Route
        path="/resellers"
        component={props => <ResellersRoute {...props} />}
        exact
      />
      <Route
        path="/resellers/:resellerId"
        component={props => <ResellerDetailRoute {...props} />}
        exact
      />
    </Switch>
  </Suspense>
)
