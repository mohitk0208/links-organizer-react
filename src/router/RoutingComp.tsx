import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import ProfilePage from '../pages/ProfilePage'
import Signup from '../pages/Signup'
import { routes } from '../utils/routeStrings'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import SendResetToken from '../pages/SendResetToken'
import ResetPassword from '../pages/ResetPassword'
import Home from '../pages/Home'
// import CategoryPage from '../pages/CategoryPage'
import LinksPage from '../pages/LinksPage'
import AddLinkPage from '../pages/AddLinkPage'
import EditLinkPage from '../pages/EditLinkPage'
import CategorySettingsPage from '../pages/CategorySettingsPage'



const RoutingComp = () => {

  return (
    <Switch>
      {/* private routes */}
      <PrivateRoute exact path={routes.PROFILE} children={<ProfilePage />} />
      <PrivateRoute exact path={routes.HOME} children={<Home />} />
      <PrivateRoute exact path={routes.CATEGORY_SETTINGS()} children={<CategorySettingsPage />} />
      {/* <PrivateRoute exact path={routes.CATEGORY()} component={CategoryPage} /> */}
      <PrivateRoute exact path={routes.ALL_LINKS} children={<LinksPage />} />
      <PrivateRoute exact path={routes.LINKS_BY_CATEGORY()} children={<LinksPage />} />
      <PrivateRoute exact path={routes.ADD_LINK} children={<AddLinkPage />} />
      <PrivateRoute exact path={routes.EDIT_LINK()} children={<EditLinkPage />} />

      {/* landing page */}
      <PublicRoute exact path={routes.LANDING_PAGE} children={<LandingPage />} />

      {/* authentication routes */}
      <PublicRoute exact path={routes.LOGIN} children={<Login />} />
      <PublicRoute exact path={routes.SIGNUP} children={<Signup />} />

      <PublicRoute exact path={routes.SEND_RESET_TOKEN} children={<SendResetToken />} />
      <PublicRoute exact path={routes.RESET_PASSWORD} children={<ResetPassword />} />

      <Route path="*" render={() => <Redirect to={routes.HOME} />} />
    </Switch>
  )
}

export default RoutingComp