import { Popover, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { getCurrentTheme, chooseLightMode, chooseDarkMode, chooseSystemMode } from '../../utils/themeFunctions'

function ThemeChoice() {
  return (
    <Popover
      as='div'
      className=" h-10 rounded-lg border flex items-center justify-center mx-2 relative cursor-pointer"
    >
      {({ open, close }) => (
        <>
          <Popover.Button className="cursor-pointer w-28 " >
            <h1 className="capitalize" >{getCurrentTheme()}</h1>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Popover.Panel className="absolute left-0 right-0 top-[110%] p-3 rounded-md bg-gray-50 dark:bg-gray-600 dark:text-white" >
              <button className="p-2 rounded-md focus:border-indigo-200 outline-none w-full focus:ring focus:ring-blue-300 " onClick={() => { chooseDarkMode(); close() }} >Dark</button>
              <button className="p-2 rounded-md focus:border-indigo-200 outline-none w-full focus:ring focus:ring-blue-300 " onClick={() => { chooseLightMode(); close() }} >Light</button>
              <button className="p-2 rounded-md focus:border-indigo-200 outline-none w-full focus:ring focus:ring-blue-300 " onClick={() => { chooseSystemMode(); close() }} >System</button>

            </Popover.Panel>
          </Transition>
        </>
      )}

    </Popover>
  )
}

export default ThemeChoice
