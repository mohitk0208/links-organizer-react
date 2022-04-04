import React from 'react'

interface ContentContainerProps {
  children: React.ReactNode,
  className?: string
}

function ContentContainer({ children, className = "" }: ContentContainerProps) {
  return (
    <div className={`flex flex-[2] px-2 ${className}`}>
      {children}
    </div>
  )
}

export default ContentContainer
