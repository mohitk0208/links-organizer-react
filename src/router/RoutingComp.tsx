import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '../utils/routeStrings'
// import LandingPage from '../pages/LandingPage'

const Login = lazy(() => import('../pages/Login'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const Signup = lazy(() => import('../pages/Signup'))
const SendResetToken = lazy(() => import('../pages/SendResetToken'))
const ResetPassword = lazy(() => import('../pages/ResetPassword'))
const Home = lazy(() => import('../pages/Home'))
const LinksPage = lazy(() => import('../pages/LinksPage'))
const AddLinkPage = lazy(() => import('../pages/AddLinkPage'))
const EditLinkPage = lazy(() => import('../pages/EditLinkPage'))
const CategorySettingsPage = lazy(() => import('../pages/CategorySettingsPage'))
const CategoryPage = lazy(() => import('../pages/CategoryPage'))
const RequireAuth = lazy(() => import('./RequireAuth'))
const RequireNoAuth = lazy(() => import('./RequireNoAuth'))


const LandingPage = lazy(() => import("../pages/LandingPage"))




const RoutingComp = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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

      </Routes>
    </Suspense>
  )
}

export default RoutingComp