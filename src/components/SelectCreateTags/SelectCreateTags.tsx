import React, { SetStateAction, useRef } from "react"
import AsyncCreatableSelect from "react-select/async-creatable"
import { tag } from "../../types/tag"
import endpoints from "../../utils/endpoints"
import { fetchWrapper } from "../../utils/fetchWrapper"
import { SelectCreateOptionType } from "."





type SelectCreateTagsProps = {
  tags: SelectCreateOptionType[],
  onChange: (newValue: SelectCreateOptionType[]) => void,
  setTags: React.Dispatch<SetStateAction<SelectCreateOptionType[]>>
}


export default function SelectCreateTags({ tags, onChange, setTags }: SelectCreateTagsProps) {


  const timerRef = useRef<number>()


  function loadOptions(inputValue: string, callback: (options: SelectCreateOptionType[]) => void) {

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


  async function handleCreate(inputValue: string) {
    try {

      const res = await fetchWrapper.post(endpoints.GET_POST_TAGS, {
        name: inputValue
      }, true)
      const resData = await res.json() as tag

      if (res.ok) {
        setTags(prev => [...prev, { label: resData.name, value: resData }])
        return
      }


    } catch (err) {
      console.log(err)
    }

  }




  return (
    <div>
      <h2>
        Tags
      </h2>

      <AsyncCreatableSelect
        isMulti
        value={tags}
        loadOptions={loadOptions}
        onChange={(newValue) => onChange(newValue as SelectCreateOptionType[])}
        onCreateOption={handleCreate}
      />
    </div>

  )
}