import React from 'react'
import PropTypes from "prop-types"
import { joinClassNames } from '../../../utils/functions'
import LoadingSpinner from '../LoadingSpinner'

const PRIMARY_COMMON = "focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-0 text-white transition duration-200 ease-in-out shadow-md"
const OUTLINE_COMMON = "focus:ring-1 focus:ring-indigo-200 focus:ring-opacity-50 border-1 transition duration-200 ease-in-out"

const variants = Object.freeze({
  "primary": joinClassNames("bg-purple-400 hover:bg-purple-500 dark:bg-purple-600 dark:hover:bg-purple-500 dark:text-white",PRIMARY_COMMON),

  "secondary": joinClassNames("bg-blue-400 hover:bg-blue-500 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-white",PRIMARY_COMMON),

  "success": joinClassNames("bg-success-green-300 hover:bg-success-green-400 dark:bg-success-green-900 dark:hover:bg-success-green-800 dark:text-white",PRIMARY_COMMON),

  "danger": joinClassNames("bg-red-400 hover:bg-red-500 dark:bg-red-900 dark:hover:bg-red-800 dark:text-white",PRIMARY_COMMON),

  "warning": joinClassNames("bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-900 dark:hover:bg-yellow-800 dark:text-white",PRIMARY_COMMON),

  "info": joinClassNames("bg-indigo-400 hover:bg-indigo-500 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-white",PRIMARY_COMMON),

  // "light": "",
  // "dark": "",

  "outline-primary": joinClassNames("border-purple-400 text-purple-500 hover:bg-purple-400 hover:text-white dark:border-purple-700 text-purple-600 dark:hover:bg-purple-600 dark:hover:border-purple-600",OUTLINE_COMMON),

  "outline-secondary":joinClassNames("border-blue-400 text-blue-500 hover:bg-blue-400 hover:text-white dark:border-blue-700 text-blue-600 dark:hover:bg-blue-600 dark:hover:border-blue-600",OUTLINE_COMMON),

  "outline-success": joinClassNames("border-success-green-400 text-success-green-500 hover:bg-success-green-400 hover:text-white dark:border-success-green-700 text-success-green-600 dark:hover:bg-success-green-600 dark:hover:border-success-green-600",OUTLINE_COMMON),

  "outline-danger": joinClassNames("border-red-400 text-red-500 hover:bg-red-400 hover:text-white dark:border-red-700 text-red-600 dark:hover:bg-red-600 dark:hover:border-red-600",OUTLINE_COMMON),

  "outline-warning": joinClassNames("border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white dark:border-yellow-700 text-yellow-600 dark:hover:bg-yellow-600 dark:hover:border-yellow-600",OUTLINE_COMMON),

  "outline-info": joinClassNames("border-indigo-400 text-indigo-500 hover:bg-indigo-400 hover:text-white dark:border-indigo-700 text-indigo-600 dark:hover:bg-indigo-600 dark:hover:border-indigo-600",OUTLINE_COMMON),

  // "outline-light": "",
  // "outline-dark": "",
})



function Button({ variant = "primary", className, children,loading=false, ...props }) {
  return (
    <button className={joinClassNames("py-1 px-2 border rounded-md cursor-pointer outline-none disabled:opacity-50 disabled:cursor-not-allowed","" ,variants[variant], className)} {...props} >

    {loading && <LoadingSpinner className="w-5 mr-1" />}

    {children}
    </button>
  )
}

Button.propTypes = {
  variant: PropTypes.oneOf(Object.keys(variants)),
  type: PropTypes.oneOf(["submit", "button", "reset"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading:PropTypes.bool
}

export default Button
