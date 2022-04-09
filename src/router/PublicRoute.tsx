import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { selectIsLoggedIn } from '../slices/authSlice'

const PublicRoute = (props: RouteProps) => {

  const isLoggedIn = useSelector(selectIsLoggedIn)


  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  return <Route {...props} />

}


export default PublicRoute