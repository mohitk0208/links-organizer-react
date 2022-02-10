import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from "../../slices/authSlice"
import Button from '../utilComponents/Button'
import ThemeChoice from './ThemeChoice'

function Header() {

  const dispatch = useDispatch()

  return (
    <div className="px-5 py-2 h-14 w-full flex-shrink-0 bg-white dark:bg-gray-800 shadow-xl flex justify-end" >
      <ThemeChoice />
      <Button variant="outline-danger" type="button" onClick={() => dispatch(logout())} >Logout</Button>
    </div>
  )
}

export default Header
