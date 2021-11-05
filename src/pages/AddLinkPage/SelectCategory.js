import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { getCategoriesAsync, getNextCategoriesAsync, selectCategories, selectLoading } from '../../slices/categoriesSlice'
import useUpdateEffect from "../../hooks/useUpdateEffect"
import useIsOnScreen from "../../hooks/useIsOnScreen"
import CategoryCard from '../../components/CategoryCard'
import CategoryCardShimmer from '../../components/CategoryCard/CategoryCardShimmer'
import { routes } from '../../utils/routeStrings'

function SelectCategory({selectedCategory, setSelectedCategory}) {

  const categories = useSelector(selectCategories)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const loadingRef = useRef()

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

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
      {categories.map((category, index) => {
        if (index === categories.length - 1) {
          return (
            <div ref={setRef} key={category.id} className="w-full"  >
              <Link to={routes.LINKS_BY_CATEGORY(category.id)} >
                <CategoryCard category={category} />
              </Link>
            </div>
          )
        }

        return (
          <Link to={routes.LINKS_BY_CATEGORY(category.id)} key={category.id}  >
            <CategoryCard category={category} />
          </Link>
        )

      })}

      {isLoading && (
        <>
          {[...Array(15)].map((_, index) => <CategoryCardShimmer key={index} />)}
        </>
      )}
    </div>
  )
}

export default SelectCategory
