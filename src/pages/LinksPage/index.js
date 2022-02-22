import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { getLinksAsync, getNextLinksAsync, selectLinks, selectLoading } from '../../slices/linksSlice'
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
import useUpdateEffect from "../../hooks/useUpdateEffect"
import useIsOnScreen from "../../hooks/useIsOnScreen"

import LinkCard from '../../components/LinkCard'
import LinkCardShimmer from '../../components/LinkCard/LinkCardShimmer'
import useDebounceTimeout from '../../hooks/useDebounceTimeout'

function LinksPage() {

  const links = useSelector(selectLinks)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const loadingRef = useRef()
  const { categoryId } = useParams()
  const queryRef = useRef("")
  const [query, setQuery] = useState("")

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: "0px", threshold: 0.5 })

  useDebounceTimeout(() => {
    dispatch(getLinksAsync(queryRef.current, categoryId))

  }, 1000, [query])


  useEffect(() => {
    loadingRef.current = isLoading
  }, [isLoading])

  useEffect(() => {
    dispatch(getLinksAsync(queryRef.current, categoryId))
  }, [categoryId, dispatch])

  useUpdateEffect(() => {
    if (!loadingRef.current && isVisible) {
      dispatch(getNextLinksAsync(queryRef.current, categoryId))
    }
  }, [dispatch, isVisible, categoryId])

  return (
    <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2" >
      <ContentContainer className="flex flex-col space-y-2 overflow-y-auto keep-scrolling py-5 pb-20 mx-2 bg-white dark:bg-gray-800 ">

        <h1 className="px-2 text-xl font-bold mt-2 pb-2 border-b " > Links </h1>

        <div className="pb-4">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              queryRef.current = e.target.value
            }}
            className="w-full text-gray-500 focus:ring-2 focus:ring-purple-400 rounded "
            type="text"
            placeholder="Search"
          />
        </div>



        {links.map((link, index) => {
          if (index === links.length - 1) {
            return (
              <div ref={setRef} key={link.id} className="w-full"  >
                <LinkCard link={link} />
              </div>
            )
          }

          return <LinkCard link={link} key={link.id} />

        })}

        {isLoading && (
          <>
            {[...Array(15)].map((_, index) => <LinkCardShimmer key={index} />)}
          </>
        )}



      </ContentContainer>
      <NewsContainer className="px-2" >
        <div className="h-48 p-4 rounded shadow-lg bg-white dark:bg-gray-800">
        </div>
      </NewsContainer>
    </div>
  )
}

export default LinksPage
