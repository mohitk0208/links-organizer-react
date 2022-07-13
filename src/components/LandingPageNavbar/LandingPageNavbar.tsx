import React from "react"
import Button from "../utilComponents/Button"

const LandingPageNavbar = () => {
  return (
    <nav className='flex items-center justify-between px-5 py-3 shadow-sm'>
      <div>
        <h1 className="font-bold">
          Links Organizer
        </h1>
      </div>
      <div className='flex gap-3' >

        <Button variant="primary" >
          Login
        </Button>
        <Button variant="outline-secondary">
          Signup
        </Button>
      </div>

    </nav>
  )
}


export default LandingPageNavbar