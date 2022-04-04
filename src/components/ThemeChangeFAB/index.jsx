import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { chooseDarkMode, chooseLightMode, chooseSystemMode } from "../../utils/themeFunctions"

function ThemeChangeFAB() {

  return (
    <Popover as="div" className="w-10 h-10 fixed bottom-10 left-10 rounded-full shadow-xl text-black bg-gray-50 flex items-center justify-center dark:bg-gray-700">
      {({ open, close }) => (
        <>
          <Popover.Button className="w-3/4 h-3/4" >
            <ChevronDownIcon className={`w-full h-full ${open ? 'rotate-180' : 'rotate-0'} transition-transform ease-in-out duration-150 dark:text-white`} />
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
            <Popover.Panel className="absolute bottom-12 p-3 rounded-md bg-gray-50 dark:bg-gray-600 dark:text-white ">
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

export default ThemeChangeFAB