import React, { useState } from 'react'
import { PencilIcon, TrashIcon } from "@heroicons/react/solid"
import DeleteConfirmModal from '../DeleteConfirmModal'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteCategoryAsync } from '../../slices/categoriesSlice'
import CreateEditCategoryModal from '../CreateEditCategoryModal'

function CategoryCard({ category, onClick, showControls, navigateTo }) {

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false)

  const {
    id,
    name

  } = category

  return (
    <div className="w-full group h-32 border border-purple-500 rounded-lg flex bg-purple-100/50 relative hover:shadow-md" onClick={onClick ? onClick : () => null} >
      {showControls && (
        <div className="group-hover:opacity-100 flex opacity-0 transition duration-200 ease-in-out absolute right-0 top-0 pr-2 pt-1 " >
          <PencilIcon className="h-6 w-6 text-purple-400 m-1 hover:text-purple-700 hover:scale-110 transition-transform duration-150 ease-in-out" onClick={() => setIsEditCategoryModalOpen(true)} />
          <TrashIcon className="h-6 w-6 text-red-400 m-1 hover:text-red-600 hover:scale-110 transition-transform duration-150 ease-in-out" onClick={() => setShowDeleteModal(true)} />
        </div>
      )}


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


      <CreateEditCategoryModal
        show={isEditCategoryModalOpen}
        onClose={() => setIsEditCategoryModalOpen(false)}
        category={category}
        isEdit={true}
      />



      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        loading={loading}
        text={
          <>
            <span>Are you sure you want to delete category </span>
            <span className="font-bold" >{name}</span>
            <span> ? </span>
          </>
        }
        onDelete={async () => {
          setLoading(true)
          await dispatch(deleteCategoryAsync(id))
          setLoading(false)
          setShowDeleteModal(false)
        }}
      />

    </div>
  )
}

export default CategoryCard
