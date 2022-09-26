import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../app/store'
import { selectIsLoggedIn } from '../slices/authSlice'
import { routes } from '../utils/routeStrings'


interface RequireAuthProps {
  children: JSX.Element,
  redirectTo?: string
}


const RequireAuth = ({ children, redirectTo = routes.LANDING_PAGE }: RequireAuthProps) => {

  const isLoggedIn = useAppSelector(selectIsLoggedIn)


  return isLoggedIn ? children : <Navigate to={redirectTo} />

}


export default RequireAuth