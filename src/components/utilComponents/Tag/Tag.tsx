import React from 'react'
import { joinClassNames } from '../../../utils/functions'
import { XCircleIcon } from "@heroicons/react/solid"
import { tag } from '../../../types/tag'

interface TagProps {
  tag: tag
  faded?: boolean,
  onClick?: () => void,
  editMode: boolean,
  onDelete: () => void,
}

function Tag({ tag, faded, onClick, editMode, onDelete }: TagProps) {
  return (
    <p className={joinClassNames(
      faded ? " bg-gray-300 opacity-60" : "bg-purple-600/70",
      "text-xs w-max rounded-full text-white m-1 min-w-[100px] text-center select-none",
      editMode ? "flex justify-between items-center" : ""
    )}
      onClick={onClick ? onClick : undefined}
    >
      <span className={editMode ? "pl-3 pr-2 " : "pb-0.5"} >
        {tag.name}
      </span>
      {editMode && <XCircleIcon className="h-4 w-4 cursor-pointer mr-0.5 hover:scale-105 hover:text-purple-900 transition duration-200 ease-in-out" onClick={onDelete} />}
    </p>
  )
}

export default Tag