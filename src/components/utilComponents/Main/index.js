import React from 'react'

function Main({ children ,className}) {
  return (
    <main className={`h-screen flex flex-1 flex-col`} >
      {children}
    </main>
  )
}

export default Main
