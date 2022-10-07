import React from "react"
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


  async function loadOptions(inputValue: string, callback: (options: FilterTagsOptionType[]) => void) {

    try {
      const res = await fetchWrapper.get(`${endpoints.GET_POST_TAGS}?name=${inputValue}&limit=10`, true)

      const resData = await res.json()

      if (res.ok) {
        return (resData.results as tag[] || []).map(t => ({ label: t.name, value: t }))
      }
    } catch (error) {
      console.log(error)
    }

    return []
  }



  return (
    <div className="" >
      <div>
        <h2>Tags</h2>
      </div>
      <Select isMulti value={tags} onChange={(newValue) => {
        console.log(newValue)
        onChange(newValue as FilterTagsOptionType[])
      }} loadOptions={loadOptions} placeholder="Filter tags..." />
    </div>
  )

}

export default FilterTags