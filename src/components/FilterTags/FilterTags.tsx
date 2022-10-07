import React, { useEffect, useRef } from "react"
import Select from "react-select/async"
import { FilterTagsOptionType } from "."
import { tag } from "../../types/tag"
import endpoints from "../../utils/endpoints"
import { fetchWrapper } from "../../utils/fetchWrapper"




type FilterTagsProps = {
  tags: FilterTagsOptionType[],
  onChange: (newTags: FilterTagsOptionType[]) => void
}


function FilterTags({ tags, onChange }: FilterTagsProps) {

  const timerRef = useRef<number>()



  function loadOptions(inputValue: string, callback: (options: FilterTagsOptionType[]) => void) {

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(async () => {

      try {
        const res = await fetchWrapper.get(`${endpoints.GET_POST_TAGS}?name=${inputValue}&limit=10`, true)

        const resData = await res.json()

        if (res.ok) {
          const results = (resData.results as tag[] || []).map(t => ({ label: t.name, value: t }))
          console.log(results)
          callback(results)
        }
      } catch (error) {
        console.log(error)
      }
    }, 500)

  }


  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])






  return (
    <Select
      isMulti
      value={tags}
      onChange={(newValue) => onChange(newValue as FilterTagsOptionType[])}
      loadOptions={loadOptions}
      placeholder="Filter tags..." />
  )

}

export default FilterTags