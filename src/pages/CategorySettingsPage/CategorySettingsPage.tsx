import { CogIcon, PencilIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import CreateEditCategoryModal from "../../components/CreateEditCategoryModal";
import Button from "../../components/utilComponents/Button";
import ContentContainer from "../../components/utilComponents/ContentContainer";
import NewsContainer from "../../components/utilComponents/NewsContainer";
import { getSingleCategoryAsync, selectCategory, selectLoading, updateCategoryAsync } from "../../slices/categorySlice";

interface ParamsType {
  categoryId: string
}

function CategorySettingsPage() {
  // const loading = useAppSelector(selectLoading)
  const category = useAppSelector(selectCategory)
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false)

  const { categoryId } = useParams<ParamsType>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getSingleCategoryAsync(Number(categoryId)))
  }, [dispatch, categoryId])



  return (
    <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2" >
      <ContentContainer className="flex flex-col overflow-y-auto keep-scrolling py-5 mx-2 bg-white dark:bg-gray-800 min-h-screen ">
        <h1 className="text-3xl font-bold pb-2 border-b mb-3 px-1 flex items-center gap-1" >
          <CogIcon className="inline h-7 w-7" />
          <span>
            Category Settings : {category.name}
          </span>
        </h1>

        <div className="px-2" >
          <div className="flex justify-between items-center pr-5 mb-1 pb-1">
            <h1 className="text-xl font-bold" >Category Info</h1>
            <Button className="flex items-center justify-center gap-1" onClick={() => setIsEditCategoryModalOpen(true)}>
              <PencilIcon className="h-4 w-4" />
              <span className="" >
                {/* General Settings */}
                Edit
              </span>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-1" >
            <p>Category Name</p>
            <p>{category.name}</p>

            <p>Category Description</p>
            <p>{category.description}</p>

            <p>Category Background</p>
            <p>
              <img src={category.background_url} className=" w-32 aspect-video object-cover" alt="category background" />
            </p>

            <p>Owner</p>
            <p className="flex items-center gap-2">
              <img src={category.owner_avatar} className="h-8 w-8 rounded-full" alt="owner avatar" />
              {category.owner_username}
            </p>

          </div>


        </div>

      </ContentContainer>
      <NewsContainer className="px-2" >
        <div className="h-48 p-4 rounded shadow-lg bg-white dark:bg-gray-800">
        </div>
      </NewsContainer>

      <CreateEditCategoryModal
        show={isEditCategoryModalOpen}
        onClose={() => setIsEditCategoryModalOpen(false)}
        category={category}
        isEdit
        onSubmit={async (values) => {
          console.log("Submit has been initiated")
          await dispatch(updateCategoryAsync(category.id, values))
        }}
      />


    </div>
  )
}

export default CategorySettingsPage;