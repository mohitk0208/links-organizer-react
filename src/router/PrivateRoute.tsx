import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useAppSelector } from '../app/store'
import { selectIsLoggedIn } from '../slices/authSlice'
import { routes } from '../utils/routeStrings'

const PrivateRoute = (props: RouteProps) => {

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  /**
   *            NEEDED FUNCTIONALITY
   *
   *
   * TODO get the token stored in the localstorage
   *    -> if token not found redirect to login
   *    -> if there is token we need to verify if it is still valid
   *        -> NOT VALID check if refresh is valid
   *            -> VALID fetch a new access token store it and return the component
   *            -> NOT VALID  redirect to login
   *        -> VALID return the component
   */

  //

  if (isLoggedIn) {
    return <Route {...props} />
  }

  return <Redirect to={routes.LOGIN} />

}


export default PrivateRoute