import React from 'react'

function NewsContainer({ children, className = "" }: { children: React.ReactNode, className: string }) {
  return (
    <div className={`h-48 hidden lg:block flex-1 ${className}`}>
      {children}
    </div>
  )
}

export default NewsContainer
