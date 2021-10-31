import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { selectIsLoggedIn } from '../slices/authSlice'

const PrivateRoute = ({component:Component,...rest}) => {

  const isLoggedIn = useSelector(selectIsLoggedIn)

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



  return  (
    <Route
    {...rest}
    render={(props) => {
      return isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
    }}
    ></Route>
  )
}


export default PrivateRoute