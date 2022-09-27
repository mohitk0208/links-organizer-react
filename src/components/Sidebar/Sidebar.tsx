import React, { useEffect, useMemo } from 'react'
import { routes } from "../../utils/routeStrings"
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NewspaperIcon, UserIcon, LinkIcon, PlusIcon } from "@heroicons/react/outline"
import { useMediaQuery } from 'react-responsive'
import { breakpoints } from '../../utils/constants'
import { getUserAsync, selectAvatar, selectFullName } from '../../slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../app/store'

function joinClassNames(...classes: string[]): string {
  return classes.join(" ")
}

function Sidebar() {

  const location = useLocation()
  const fullName = useAppSelector(selectFullName)
  const avatar = useAppSelector(selectAvatar)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserAsync())
  }, [dispatch])


  const navigation = useMemo(() => {

    return [
      { name: "Home", href: routes.HOME, icon: NewspaperIcon, current: location && location.pathname === routes.HOME },
      { name: "Links", href: routes.ALL_LINKS, icon: LinkIcon, current: location && location.pathname === routes.ALL_LINKS },
      { name: "Profile", href: routes.PROFILE, icon: UserIcon, current: location && location.pathname === routes.PROFILE },
      { name: "Add Link", href: routes.ADD_LINK, icon: PlusIcon, current: location && location.pathname === routes.ADD_LINK }
    ]

  }, [location])

  const isDesktopMode = useMediaQuery({ query: breakpoints['2xl'] })

  if (isDesktopMode) {
    return (
      <div className="h-screen w-[400px] bg-white dark:bg-gray-800 flex flex-shrink-0 shadow-xl dark:text-white z-10">
        <div className="flex flex-col flex-grow" >

          {/* the logo and brand name */}
          <div className="flex items-center justify-center px-5 py-2  shadow-md" >
            {/* <img className="h-10 w-auto" src={logoImg} alt="" /> */}
            {/* <img className="h-10 w-auto" src={TextImg} alt="" /> */}
            <Link to={routes.HOME} >
              <span className="font-bold text-xl py-1" >Links Organizer</span>
            </Link>
          </div>

          <div className="mt-5 flex-1 flex flex-col" >
            <nav className="flex-1 px-3 space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={joinClassNames(
                    item.current ? " bg-purple-200/30 text-purple-700 dark:bg-purple-50/10" : "dark:hover:bg-purple-50/5 hover:bg-purple-200/20 dark:bg-transparent bg-purple-200/5 text-purple-600/90  ",
                    "flex items-center px-5 py-2 text-md lg:text-lg font-medium rounded-sm uppercase relative"
                  )}
                >
                  {item.current && <span className="absolute -left-1 h-full w-1 block bg-purple-500" />}
                  <item.icon className={joinClassNames(
                    item.current ? "text-purple-700 " : "opacity-50",
                    "w-6 h-6 mr-2"
                  )} />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* profile */}
          <NavLink to={routes.PROFILE}>
            <div className="flex pt-5 pb-8 px-5 justify-self-end items-center shadow-2xl cursor-pointer" >
              <img className=" h-14 w-14 block mr-2 shadow-lg bg-gray-100/40 hover:shadow-xl hover:scale-105 transition-transform duration-100 ease-in-out rounded-full" src={avatar} alt="Profile pic" />
              <p className="uppercase lg:text-lg px-5">
                {fullName && fullName}
              </p>
            </div>
          </NavLink>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-white dark:bg-gray-800 flex flex-shrink-0 shadow-xl dark:text-white z-10">
      <div className="flex flex-col flex-grow" >

        {/* the logo and brand name */}
        <div className="flex items-center justify-center px-5 py-2  shadow-md" >
          {/* <img className="h-10 w-auto" src={logoImg} alt="" /> */}
          <span className='h-8 py-2' ></span>
        </div>

        <div className="mt-5 flex-1 flex flex-col" >
          <nav className="flex-1 px-1 space-y-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={joinClassNames(
                  item.current ? "" : "hover:bg-purple-200/20",
                  "flex items-center px-5 py-2 font-medium rounded-sm uppercase relative"
                )}
              >
                {item.current && <span className="absolute -left-2 h-full w-2 block bg-purple-500" />}
                <item.icon className={joinClassNames(
                  item.current ? " text-purple-500 " : "opacity-50",
                  "w-8 h-8"
                )} />
              </NavLink>
            ))}
          </nav>
        </div>

        {/* profile */}
        <NavLink to={routes.PROFILE}>
          <div className="flex pt-5 pb-8 justify-self-end items-center justify-center cursor-pointer" >
            <img className="h-14 w-14 block shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-100 ease-in-out rounded-full" src={avatar} alt="Profile pic" />
          </div>
        </NavLink>

      </div>
    </div>
  )

}

export default Sidebar
