import React, { useState } from 'react'
import Tag from "../utilComponents/Tag"
import AsyncSelect from '../formComponents/AsyncSelect'
import Button from '../utilComponents/Button'
import CreateTagModal from '../CreateTagModal'

function SelectTags({ tags, setTags }) {

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleSubmit = (tag) => {
    setTags(prev => ([...prev, tag]))
  }

  const handleFilter = (results) => {

    const currentTags = new Set(tags.map(t => t.id))

    return results.filter(tag => !currentTags.has(tag.id))
  }


  return (
    <>
      <div>
        <div className="flex justify-between" >
          <h2> Tags</h2>
          <Button variant="outline-primary" type="button" className="text-sm" onClick={() => setIsCreateModalOpen(true)} > Create new </Button>
        </div>
        <div className="flex flex-wrap" >
          <>
            {tags.map(tag => {

              const onTagClick = () => {

              }

              return <Tag key={tag.id} tag={tag} faded={false} onClick={onTagClick} />

            })}
          </>

          <AsyncSelect onSubmit={handleSubmit} resultFilter={handleFilter} />

        </div>
      </div>
      <CreateTagModal show={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </>
  )
}

export default SelectTags
