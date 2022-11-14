import React, { useEffect, useRef } from "react"
import AsyncSelect from "react-select/async"
import { components, OptionProps, ValueContainerProps } from "react-select"
import { publicUserType } from "../../../types/userSliceTypes"
import endpoints from "../../../utils/endpoints"
import { fetchWrapper } from "../../../utils/fetchWrapper"
import { useAppSelector } from "../../../app/store"
import { selectUserId } from "../../../slices/userSlice"

type AsyncSearchUserProps = {
  selectedUser: publicUserType | null,
  onChange: (newValue: publicUserType) => void
}

export default function AsyncSearchUser({ selectedUser, onChange }: AsyncSearchUserProps) {

  const timerRef = useRef<number>()
  const userId = useAppSelector(selectUserId)

  function loadOptions(inputValue: string, callback: (options: publicUserType[]) => void) {

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(async () => {

      try {
        const res = await fetchWrapper.get(`${endpoints.SEARCH_USER}?search=${inputValue}&limit=10`, true)

        const resData = await res.json()

        if (res.ok) {
          const results = (resData.results as publicUserType[] || []).filter(r => r.id !== userId)
          callback(results)
        }

      }
      catch (error) {
        console.log(error)
      }

    }, 500)

  }


  useEffect(() => {
    return () => clearTimeout(timerRef.current)

  }, [])


  const CustomOption = (props: OptionProps<publicUserType>) => {

    const { first_name, username, avatar } = props.data



    return (
      <components.Option {...props} >
        <div className="flex gap-3 px-1" >
          <img src={avatar} className="aspect-square rounded-full w-8" alt="" />
          <div className="flex-1">
            <p className="" >
              {first_name}
            </p>
            <p className=" text-sm text-gray-600 italic" >
              {username}
            </p>
          </div>
        </div>
      </components.Option>
    )
  }

  const CustomValueContainer = ({ children, ...props }: ValueContainerProps<publicUserType>) => {

    if (props.hasValue && !props.isMulti) {
      const { first_name, avatar, username } = props.getValue()[0]

      return (
        <components.ValueContainer {...props}>
          <div className="flex gap-3 m-1 px-1 rounded-md border " >
            <img src={avatar} className="aspect-square rounded-full w-8" alt="" />
            <div className="flex-1">
              <p className="" >
                {first_name}
              </p>
              <p className=" text-sm text-gray-600 italic" >
                {username}
              </p>
            </div>
          </div>
        </components.ValueContainer>
      )
    }


    return (
      <components.ValueContainer {...props}>{children}</components.ValueContainer>
    )
  }


  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      value={selectedUser}
      onChange={(newValue) => onChange(newValue as publicUserType)}
      components={{
        Option: CustomOption,
        ValueContainer: CustomValueContainer
      }}
      isClearable
      placeholder="Search Receiver..."
    />
  )
}