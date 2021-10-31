import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { selectIsLoggedIn } from '../slices/authSlice'

const PublicRoute = ({ component: Component, ...rest }) => {

  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn ? <Redirect to="/" /> : <Component {...props} />
      }}
    ></Route>
  )
}


export default PublicRoute