import { CogIcon } from "@heroicons/react/solid";
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
  const loading = useAppSelector(selectLoading)
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
        <h1 className="text-2xl font-bold pb-2 border-b mb-2 px-1 align-middle" >
          <CogIcon className="inline h-6 w-6" /> Category Settings
        </h1>

        <div className="" >
          <Button className="flex items-center justify-center gap-1" onClick={() => setIsEditCategoryModalOpen(true)}>
            <CogIcon className="h-5 w-5" />
            <span className="text-lg" >
              General Settings
            </span>
          </Button>
        </div>

        This is the settings page for category
        {!loading ? category.name : "loading"}

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