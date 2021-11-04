import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams } from "react-router-dom"
import { getLinksAsync, getNextLinksAsync, selectLinks, selectLoading } from '../../slices/linksSlice'
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
import useUpdateEffect from "../../hooks/useUpdateEffect"
import useIsOnScreen from "../../hooks/useIsOnScreen"

import LinkCard from '../../components/LinkCard'
import LinkCardShimmer from '../../components/LinkCard/LinkCardShimmer'

function LinksPage() {

  const links = useSelector(selectLinks)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const loadingRef = useRef()
  const { categoryId } = useParams()

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: "0px", threshold: 0.5 })

  useEffect(() => {
    loadingRef.current = isLoading
  }, [isLoading])

  useEffect(() => {
    dispatch(getLinksAsync(categoryId))
  }, [categoryId, dispatch])

  useUpdateEffect(() => {
    if (!loadingRef.current && isVisible) {
      dispatch(getNextLinksAsync(categoryId))
    }
  }, [dispatch, isVisible, categoryId])

  return (
    <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2" >
      <ContentContainer className="flex flex-col overflow-y-auto keep-scrolling py-5 mx-2 bg-white min-h-screen ">

        <h1 className="px-2 text-xl font-bold mt-2 mb-4 pb-2 border-b " > Links </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
          {links.map((link, index) => {
            if (index === links.length - 1) {
              return (
                <div ref={setRef} key={link.id} className="w-full"  >
                  <LinkCard category={link} />
                </div>
              )
            }

            return <LinkCard category={link} key={link.id} />

          })}

          {isLoading && (
            <>
              {[...Array(15)].map((_, index) => <LinkCardShimmer key={index} />)}
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

export default LinksPage
