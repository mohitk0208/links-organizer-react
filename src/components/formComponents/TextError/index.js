import React from 'react'
import { InformationCircleIcon } from "@heroicons/react/outline"

function index({ touched, error }) {
  return (
    <span className="text-xs text-red-500 px-2 align-middle">
      {touched && error && (<>
        <span className="inline-block">
          <InformationCircleIcon className="w-4 inline mr-2" />
        </span>
        <span className="inline-block">
          {error}
        </span>
      </>
      )}

    </span>
  )
}

export default index
