import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import ProfilePage from '../pages/ProfilePage'
import Signup from '../pages/Signup'
import { routes } from '../utils/routeStrings'
import SendResetToken from '../pages/SendResetToken'
import ResetPassword from '../pages/ResetPassword'
import Home from '../pages/Home'
import LinksPage from '../pages/LinksPage'
import AddLinkPage from '../pages/AddLinkPage'
import EditLinkPage from '../pages/EditLinkPage'
import CategorySettingsPage from '../pages/CategorySettingsPage'
import CategoryPage from '../pages/CategoryPage'
import RequireAuth from './RequireAuth'
import RequireNoAuth from './RequireNoAuth'




const RoutingComp = () => {
  return (
    <Routes>
      <Route path={routes.PROFILE} element={<RequireAuth ><ProfilePage /></RequireAuth>} />
      <Route path={routes.HOME} element={<RequireAuth ><Home /></RequireAuth>} />

      <Route path={routes.CATEGORY_SETTINGS()} element={<RequireAuth><CategorySettingsPage /></RequireAuth>} />
      <Route path={routes.CATEGORY()} element={<RequireAuth ><CategoryPage /></RequireAuth>} />
      <Route path={routes.ALL_LINKS} element={<RequireAuth ><LinksPage /></RequireAuth>} />
      <Route path={routes.LINKS_BY_CATEGORY()} element={<RequireAuth ><LinksPage /></RequireAuth>} />
      <Route path={routes.ADD_LINK} element={<RequireAuth ><AddLinkPage /></RequireAuth>} />
      <Route path={routes.EDIT_LINK()} element={<RequireAuth ><EditLinkPage /></RequireAuth>} />

      {/* landing page */}
      <Route path={routes.LANDING_PAGE} element={<RequireNoAuth><LandingPage /></RequireNoAuth>} />

      {/* authentication routes */}
      <Route path={routes.LOGIN} element={<RequireNoAuth><Login /></RequireNoAuth>} />
      <Route path={routes.SIGNUP} element={<RequireNoAuth><Signup /></RequireNoAuth>} />


      <Route path={routes.SEND_RESET_TOKEN} element={<RequireNoAuth><SendResetToken /></RequireNoAuth>} />
      <Route path={routes.RESET_PASSWORD} element={<RequireNoAuth><ResetPassword /></RequireNoAuth>} />

      <Route path="*" element={<Navigate to={routes.HOME} />} />

    </Routes>)
}

export default RoutingComp