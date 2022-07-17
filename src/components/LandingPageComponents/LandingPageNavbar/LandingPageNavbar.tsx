import React from "react"
import { useHistory } from "react-router-dom"
import { routes } from "../../../utils/routeStrings"
import Button from "../../utilComponents/Button"

const LandingPageNavbar = () => {

  const history = useHistory()

  return (
    <nav className='flex items-center justify-between px-5 py-3 shadow-md z-10 fixed top-0 left-0 right-0 bg-white'>
      <div>
        <h1 className="font-bold">
          Links Organizer
        </h1>
      </div>
      <div className='flex gap-3' >

        <Button variant="primary" onClick={() => history.push(routes.LOGIN)} >
          Login
        </Button>
        <Button variant="outline-secondary" onClick={() => history.push(routes.SIGNUP)}>
          Signup
        </Button>
      </div>

    </nav>
  )
}


export default LandingPageNavbar