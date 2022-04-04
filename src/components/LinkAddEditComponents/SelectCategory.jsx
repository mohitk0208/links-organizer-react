import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesAsync, getNextCategoriesAsync, selectCategories, selectLoading } from '../../slices/categoriesSlice'
import useUpdateEffect from "../../hooks/useUpdateEffect"
import useIsOnScreen from "../../hooks/useIsOnScreen"
import CategoryCard from '../CategoryCard'
import CategoryCardShimmer from '../CategoryCard/CategoryCardShimmer'
import { joinClassNames } from '../../utils/functions'
import { InformationCircleIcon } from "@heroicons/react/outline"
import useDebounceTimeout from "../../hooks/useDebounceTimeout"

function SelectCategory({ selectedCategory, setSelectedCategory, error }) {

  const categories = useSelector(selectCategories)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const loadingRef = useRef()
  const queryRef = useRef("")
  const [query, setQuery] = useState("")

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: "0px", threshold: 0.5 })

  useDebounceTimeout(() => {

      dispatch(getCategoriesAsync(query))

  }, 1000, [query])


useEffect(() => {
  loadingRef.current = isLoading
}, [isLoading])

useEffect(() => {
  queryRef.current = query
},[query])

useEffect(() => {
  dispatch(getCategoriesAsync(queryRef.current))
}, [dispatch])

useUpdateEffect(() => {
  if (!loadingRef.current && isVisible) {
    dispatch(getNextCategoriesAsync(queryRef.current))
  }
}, [dispatch, isVisible])

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
      {categories.map((category, index) => {
        if (index === categories.length - 1) {
          return (
            <div
              ref={setRef}
              key={category.id}
              className={joinClassNames(
                "w-full cursor-pointer",
                selectedCategory === category.id ? "ring-2 ring-purple-500/70 ring-offset-2 font-bold" : " opacity-50"
              )}
              onClick={() => setSelectedCategory(category.id)}
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
            onClick={() => setSelectedCategory(category.id)}
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

export default SelectCategory
