import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import ProfilePage from '../pages/ProfilePage'
import Signup from '../pages/Signup'
import { routes } from '../utils/routeStrings'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import SendResetToken from '../pages/SendResetToken'
import ResetPassword from '../pages/ResetPassword'



const RoutingComp = () => {

  return (
    <Switch>
      {/* private routes */}
      <PrivateRoute exact path={routes.PROFILE} component={ProfilePage} />

      {/* landing page */}
      <PublicRoute exact path={routes.LANDING_PAGE} component={LandingPage} />

      {/* authentication routes */}
      <PublicRoute exact path={routes.LOGIN} component={Login} />
      <PublicRoute exact path={routes.SIGNUP} component={Signup} />

      <PublicRoute exact path={routes.SEND_RESET_TOKEN} component={SendResetToken} />
      <PublicRoute exact path={routes.RESET_PASSWORD} component={ResetPassword} />

      <Redirect from="*" to={routes.HOME} />
    </Switch>
  )
}

export default RoutingComp