import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesAsync, getNextCategoriesAsync, selectCategories, selectLoading } from '../../slices/categoriesSlice'
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
import useUpdateEffect from "../../hooks/useUpdateEffect"
import useIsOnScreen from "../../hooks/useIsOnScreen"
import CategoryCard from '../../components/CategoryCard'
import CategoryCardShimmer from '../../components/CategoryCard/CategoryCardShimmer'
import { routes } from '../../utils/routeStrings'
import CreateEditCategoryModal from '../../components/CreateEditCategoryModal'
import Button from '../../components/utilComponents/Button'

function Home() {

  const categories = useSelector(selectCategories)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const loadingRef = useRef()
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false)

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: "0px", threshold: 0.5 })

  useEffect(() => {
    loadingRef.current = isLoading
  }, [isLoading])

  useEffect(() => {
    dispatch(getCategoriesAsync())
  }, [dispatch])

  useUpdateEffect(() => {
    if (!loadingRef.current && isVisible) {
      dispatch(getNextCategoriesAsync())
    }
  }, [])

  return (
    <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2" >
      <ContentContainer className="flex flex-col overflow-y-auto keep-scrolling py-5 mx-2 bg-white dark:bg-gray-800 min-h-screen ">

        <div className="flex justify-between items-center mt-2 mb-4 pb-2 border-b px-2" >
          <h1 className="text-xl font-bold  " > Categories </h1>
          <Button variant="outline-primary" className="" onClick={() => setIsCreateCategoryModalOpen(true)} >Create </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 pb-36">
          {categories.map((category, index) => {
            if (index === categories.length - 1) {
              return (
                <div ref={setRef} key={category.id} className="w-full"  >
                  <CategoryCard category={category} navigateTo={routes.LINKS_BY_CATEGORY(category.id)} showControls />
                </div>
              )
            }

            return (<CategoryCard category={category} navigateTo={routes.LINKS_BY_CATEGORY(category.id)} key={category.id} showControls />)

          })}

          {isLoading && (
            <>
              {[...Array(15)].map((_, index) => <CategoryCardShimmer key={index} />)}
            </>
          )}
        </div>



      </ContentContainer>
      <NewsContainer className="px-2" >
        <div className="h-48 p-4 rounded shadow-lg bg-white dark:bg-gray-800">
        </div>
      </NewsContainer>

      <CreateEditCategoryModal show={isCreateCategoryModalOpen} onClose={() => setIsCreateCategoryModalOpen(false)} />

    </div>
  )
}

export default Home
