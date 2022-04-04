import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom"
import { getCategoriesAsync, getNextCategoriesAsync, selectCategories, selectLoading } from '../../slices/categoriesSlice'
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
import useUpdateEffect from "../../hooks/useUpdateEffect"
import useIsOnScreen from "../../hooks/useIsOnScreen"
import CategoryCard from '../../components/CategoryCard'
import CategoryCardShimmer from '../../components/CategoryCard/CategoryCardShimmer'
import { routes } from '../../utils/routeStrings'

function CategoryPage() {

  const subCategories = useSelector(selectCategories)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const loadingRef = useRef()
  const { categoryId } = useParams()

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: "0px", threshold: 0.5 })

  useEffect(() => {
    loadingRef.current = isLoading
  }, [isLoading])

  useEffect(() => {
    dispatch(getCategoriesAsync(categoryId))
  }, [categoryId, dispatch])

  useUpdateEffect(() => {
    if (!loadingRef.current && isVisible) {
      dispatch(getNextCategoriesAsync(categoryId))
    }
  }, [dispatch, isVisible, categoryId])

  return (
    <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2" >
      <ContentContainer className="flex flex-col overflow-y-auto keep-scrolling py-5 mx-2 bg-white min-h-screen ">

        <h1 className="px-2 text-xl font-bold mt-2 mb-4 pb-2 border-b " > Sub Categories </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
          {subCategories.map((category, index) => {
            if (index === subCategories.length - 1) {
              return (
                <div ref={setRef} key={category.id} className="w-full"  >
                  <Link to={routes.LINKS_BY_CATEGORY(category.id)} >
                    <CategoryCard category={category} />
                  </Link>
                </div>
              )
            }

            return (
              <Link to={routes.LINKS_BY_CATEGORY(category.id)} >
                <CategoryCard category={category} key={category.id} />
              </Link>
            )


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
    </div>
  )
}

export default CategoryPage
