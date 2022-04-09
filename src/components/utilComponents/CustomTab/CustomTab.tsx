import React from "react"
import { Tab } from "@headlessui/react"
import { joinClassNames } from "../../../utils/functions"

interface CustomTabProps {
  children: React.ReactNode
}

const CustomTab = ({ children }: CustomTabProps) => {
  return (
    <Tab
      className={({ selected }) =>
        joinClassNames(
          'w-full py-2 capitalize leading-5 focus:outline-none select-none transition-colors duration-150 ease-in-out',
          selected
            ? 'bg-transparent border-b-2 border-blue-500 text-green-600 font-bold '
            : 'text-green-400 hover:text-green-400/90 border-b-2 border-transparent hover:border-blue-500/60 '
        )
      }>{children}</Tab>
  )
}

export default CustomTab