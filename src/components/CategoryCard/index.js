import React, { useState } from 'react'
import { PencilIcon, TrashIcon } from "@heroicons/react/solid"
import DeleteConfirmModal from '../DeleteConfirmModal'
import { Link } from 'react-router-dom'

function CategoryCard({ category, onClick, showControls, navigateTo }) {

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    // id,
    name

  } = category

  return (
    <div className="w-full group h-32 border border-purple-500 rounded-sm flex bg-purple-100/50 relative hover:shadow-md" onClick={onClick ? onClick : () => null} >
      <div className="group-hover:opacity-100 flex opacity-0 transition duration-200 ease-in-out absolute right-0 top-0 pr-2 pt-1 " >
        <PencilIcon className="h-6 w-6 text-purple-400 m-1 hover:text-purple-700 hover:scale-110 transition-transform duration-150 ease-in-out" />
        <TrashIcon className="h-6 w-6 text-red-400 m-1 hover:text-red-600 hover:scale-110 transition-transform duration-150 ease-in-out" onClick={() => setShowDeleteModal(true)} />
      </div>

      {
        navigateTo ? (
          <Link to={navigateTo}>
            <p
              className="absolute bottom-0 left-0 right-0 text-center py-2 h-10 bg-purple-300 cursor-pointer hover:bg-purple-400 transition duration-200 ease-in-out "
            >
              {name}
            </p>
          </Link>
        ) : (
          <p
            className="absolute bottom-0 left-0 right-0 text-center py-2 h-10 bg-purple-300 cursor-pointer hover:bg-purple-400 transition duration-200 ease-in-out "
          >
            {name}
          </p>
        )
      }



      <DeleteConfirmModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} loading={loading} />

    </div>
  )
}

export default CategoryCard
