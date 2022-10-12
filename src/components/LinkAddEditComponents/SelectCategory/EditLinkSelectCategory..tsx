import React, { useEffect, useRef, useState } from 'react'
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { getCategoriesAsync, getNextCategoriesAsync, selectCategories, selectLoading } from '../../../slices/categoriesSlice'
import useIsOnScreen from '../../../hooks/useIsOnScreen'
import useUpdateEffect from "../../../hooks/useUpdateEffect"
import CategoryCard from '../../CategoryCard'
import CategoryCardShimmer from '../../CategoryCard/CategoryCardShimmer'
import useDebounceTimeout from '../../../hooks/useDebounceTimeout'
import { joinClassNames } from '../../../utils/functions'
import { EditLinkSelectCategoryProps } from '.'
import { getSingleCategoryAsync, resetCurrentCategory, selectCategory, selectLoading as selectIsCategoryLoading } from '../../../slices/categorySlice'







function EditLinkSelectCategory({ selectedCategory, onChange, error }: EditLinkSelectCategoryProps) {

  const categories = useAppSelector(selectCategories)
  const isLoading = useAppSelector(selectLoading)
  const dispatch = useAppDispatch()
  const loadingRef = useRef<undefined | boolean>()
  const queryRef = useRef("")
  const [query, setQuery] = useState("")
  const initiallySelectedId = useRef(selectedCategory)
  const initialSelectedCategory = useAppSelector(selectCategory)
  const isInitialSelectedCategoryLoading = useAppSelector(selectIsCategoryLoading)

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: "0px", threshold: 0.5 })

  useDebounceTimeout(() => {

    dispatch(getCategoriesAsync(query))

  }, 1000, [query])


  useEffect(() => {
    loadingRef.current = isLoading
  }, [isLoading])

  useEffect(() => {
    queryRef.current = query
  }, [query])

  useEffect(() => {
    dispatch(getCategoriesAsync(queryRef.current))
  }, [dispatch])

  useUpdateEffect(() => {
    if (!loadingRef.current && isVisible) {
      dispatch(getNextCategoriesAsync(queryRef.current))
    }
  }, [dispatch, isVisible])


  useEffect(() => {

    dispatch(getSingleCategoryAsync(initiallySelectedId.current))

    return () => dispatch(resetCurrentCategory())

  }, [dispatch])



  return (
    <>

      <div className="px-2 mb-1" >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded text-gray-500 focus:ring-2 focus:ring-purple-400 "
          type="text"
          placeholder="Search " />
      </div>


      <p className="px-2 text-xs text-red-500 my-2 ml-1" >
        {error && (
          <>
            <InformationCircleIcon className="inline h-3 w-3 mr-1" />
            <span>{error}</span>
          </>
        )}
      </p>



      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2 pb-16">

        {isInitialSelectedCategoryLoading ? (
          <CategoryCardShimmer />
        ) : (
          <div
            className={joinClassNames(
              "w-full cursor-pointer",
              selectedCategory === initiallySelectedId.current ? "ring-2 ring-purple-500/70 ring-offset-2 font-bold" : " opacity-50"
            )}
            onClick={() => onChange(initialSelectedCategory.id)}
          >
            <CategoryCard category={initialSelectedCategory} />
          </div>
        )}




        {categories
          .filter(c => c.id !== initiallySelectedId.current)
          .map((category, index, values) => {
            if (index === values.length - 1) {
              return (
                <div
                  ref={setRef as any}
                  key={category.id}
                  className={joinClassNames(
                    "w-full cursor-pointer",
                    selectedCategory === category.id ? "ring-2 ring-purple-500/70 ring-offset-2 font-bold" : " opacity-50"
                  )}
                  onClick={() => onChange(category.id)}
                >
                  <CategoryCard category={category} />
                </div>
              )
            }

            return (
              <div
                key={category.id}
                className={joinClassNames(
                  "w-full cursor-pointer",
                  selectedCategory === category.id ? "ring-2 ring-purple-500/70 ring-offset-2 font-bold" : " opacity-50"
                )}
                onClick={() => onChange(category.id)}
              >
                <CategoryCard category={category} />
              </div>
            )

          })}

        {isLoading && (
          <>
            {[...Array(15)].map((_, index) => <CategoryCardShimmer key={index} />)}
          </>
        )}

      </div>
    </>
  )
}


export default EditLinkSelectCategory
