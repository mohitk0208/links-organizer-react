import React, { useState } from 'react'
import { CogIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import DeleteConfirmModal from '../DeleteConfirmModal'
import { Link } from 'react-router-dom'
import { deleteCategoryAsync } from '../../slices/categoriesSlice'
import CreateEditCategoryModal from '../CreateEditCategoryModal'
import { CategoryType } from '../../types/categoriesSliceTypes'
import { routes } from '../../utils/routeStrings'
import { useAppDispatch } from '../../app/store'

type CategoryCardWithControls = {
  showControls: true,
  navigateTo: string
}

type CategoryCardWithoutControls = {
  showControls?: false,
  navigateTo?: undefined
}


type CategoryCardProps = {
  category: CategoryType,
  onClick?: () => void
} & (CategoryCardWithControls | CategoryCardWithoutControls)


function CategoryCard({ category, onClick, showControls, navigateTo }: CategoryCardProps) {

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false)

  const {
    id,
    name,
    background_url
  } = category



  return (
    <>
      {
        showControls ? (
          <Link to={navigateTo} onClick={(e) => e.stopPropagation()} >
            <div className="w-full aspect-[2/1.5] group border border-purple-500 rounded-lg flex bg-center bg-no-repeat bg-cover relative hover:shadow-md overflow-hidden" onClick={onClick ? onClick : () => null}
              style={{
                backgroundImage: `url(${background_url})`,
              }}
            >
              <div className="group-hover:opacity-100 flex opacity-0 transition duration-200 ease-in-out absolute right-0 top-0 pr-2 pt-1 " >
                <Link to={routes.CATEGORY_SETTINGS(category.id)}>
                  <CogIcon className='h-6 w-6 text-purple-400 m-1 hover:text-purple-700 hover:scale-110 transition-transform duration-150 ease-in-out' />
                </Link>
                <PencilIcon className="h-6 w-6 text-purple-400 m-1 hover:text-purple-700 hover:scale-110 transition-transform duration-150 ease-in-out" onClick={() => setIsEditCategoryModalOpen(true)} />
                <TrashIcon className="h-6 w-6 text-red-400 m-1 hover:text-red-600 hover:scale-110 transition-transform duration-150 ease-in-out" onClick={() => setShowDeleteModal(true)} />
              </div>

              <p
                className="absolute bottom-0 left-0 right-0 text-center py-2 h-14 bg-gradient-to-b from-transparent via-purple-400/60 to-purple-400 cursor-pointer transition duration-200 ease-in-out opacity-90 hover:opacity-100 flex items-end justify-center uppercase font-bold text-white "
              >
                {name}
              </p>
            </div >
          </Link>

        ) : (
          <div className="w-full aspect-[2/1.5] group border border-purple-500 rounded-lg flex bg-center bg-no-repeat bg-cover relative hover:shadow-md overflow-hidden" onClick={onClick ? onClick : () => null}
            style={{
              backgroundImage: `url(${background_url})`,
            }}
          >
            <p
              className="absolute bottom-0 left-0 right-0 text-center py-2 h-10 bg-purple-300 cursor-pointer hover:bg-purple-400 transition duration-200 ease-in-out "
            >
              {name}
            </p>

          </div >
        )}


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
    </>

  )
}

export default CategoryCard
