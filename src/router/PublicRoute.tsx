import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { selectIsLoggedIn } from '../slices/authSlice'
import { routes } from '../utils/routeStrings'

const PublicRoute = (props: RouteProps) => {

  const isLoggedIn = useSelector(selectIsLoggedIn)


  if (isLoggedIn) {
    return <Redirect to={routes.HOME} />
  }

  return <Route {...props} />

}


export default PublicRoute