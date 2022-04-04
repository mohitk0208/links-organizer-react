import React from 'react'

interface MainProps {
  children: React.ReactNode,
  className: string
}

export default function Main({ children, className = "" }: MainProps) {
  return (
    <main className={`h-screen flex flex-1 flex-col`} >
      {children}
    </main>
  )
}
