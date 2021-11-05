import { Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import useDebounceTimeout from '../../../hooks/useDebounceTimeout'
import { fetchWrapper } from "../../../utils/fetchWrapper"
import endpoints from "../../../utils/endpoints"


function AsyncSelect({ onSubmit, resultFilter, disabled = false }) {

  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [results, setResults] = useState([])


  useDebounceTimeout(() => {

    async function getResults() {

      if (query !== "") {

        setLoading(true)

        try {
          const res = await fetchWrapper.get(`${endpoints.GET_POST_TAGS}?name=${query}&limit=10`, true)

          const resData = await res.json()

          console.log("results", resData);

          if (res.ok) {
            setResults(resData.results)
          }
        } catch (error) {
          console.log(error)
        }
        finally {
          setLoading(false)
        }

      } else {
        setResults([])
        setLoading(false)
      }
    }

    getResults()

  }, 500, [query])


  useEffect(() => {

    if (!loading) {
      if (results.length !== 0 && query !== "") {
        setIsOpen(true)
      }
      else if (query === "") {
        setIsOpen(false)
      }
    }
    else {
      setIsOpen(true)
    }

  }, [query, results, loading])


  function reset() {
    setQuery("")
    setIsOpen(false)
    setLoading(false)
    setResults([])
  }

  function handleSubmit(value) {
    reset()
    onSubmit(value)

  }

  useEffect(() => {

    reset()

  }, [disabled])


  return (

    // search Component
    <div className="relative">
      <input className="border-0 border-b text-sm pt-0 pb-1 ml-2 px-2 min-w-[100px] max-w-[200px]  " style={{ boxShadow: "none" }} type="text" value={query} onChange={(e) => setQuery(e.target.value)} disabled={disabled} />

      <Transition
        show={isOpen}
        as={Fragment}
        enter=""
        enterFrom=""
        enterTo=""
        leave=""
        leaveFrom=""
        leaveTo=""
      // className="absolute top-full mt-1 bg-gray-500 text-white text-center w-full rounded-md py-1 px-2"
      >
        <ul className="absolute top-full mt-1 max-h-56 overflow-y-scroll bg-gray-500 text-white text-center w-full rounded-md py-1 px-2 shadow-2xl z-50 space-y-1 divide-y divide-white/25 text-sm" >

          <InnerElement loading={loading} query={query} results={resultFilter(results)} onSubmit={handleSubmit} />

        </ul>
      </Transition>


    </div>

  )

}


const InnerElement = ({ loading, query, results, onSubmit }) => {

  if (loading) {
    return (
      <div className="flex items-center justify-center" >
        <p >Loading...</p>
      </div>
    )

  } else if (results.length !== 0) {
    return (
      results.map(tag => (
        <li key={tag.id} className="cursor-pointer" onClick={() => onSubmit(tag)} > {tag.name} </li>
      ))
    )
  } else if (query !== "") {
    return (
      <div className="flex items-center justify-center" >
        <p>No results found</p>
      </div>
    )
  }

  return null


}


export default AsyncSelect
