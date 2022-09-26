import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../slices/authSlice'
import { routes } from '../utils/routeStrings'


interface RequireNoAuthProps {
  children: JSX.Element,
  redirectTo?: string
}

const RequireNoAuth = ({ children, redirectTo = routes.HOME }: RequireNoAuthProps) => {

  const isLoggedIn = useSelector(selectIsLoggedIn)

  return isLoggedIn ? <Navigate to={redirectTo} /> : children

}


export default RequireNoAuth