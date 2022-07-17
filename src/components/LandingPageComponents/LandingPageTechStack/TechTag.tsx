import React from "react"

interface TechTagProps {
  name: string
  url: string
}


const TechTag = ({ name, url }: TechTagProps) => {
  return (
    <a className="border-2 border-purple-400 rounded-md px-2 py-0.5 font-bold text-purple-500 opacity-80 hover:bg-purple-400 hover:text-white transition-colors duration-150 capitalize" href={url} target="_blank" rel="noreferrer" >
      {name}
    </a>
  )
}

export default TechTag;