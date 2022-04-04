import React from 'react'
import AsyncSelect from '../formComponents/AsyncSelect'
import Button from '../utilComponents/Button'
import Tag from '../utilComponents/Tag'


function FilterTags() {
  const [tags, setTags] = React.useState([])

  const handleSubmit = (tag) => {
    setTags(prev => ([...prev, tag]))
  }

  const handleFilter = (results) => {

    const currentTags = new Set(tags.map(t => t.id))

    return results.filter(tag => !currentTags.has(tag.id))
  }



  return (
    <div className='flex gap-1' >
      <AsyncSelect onSubmit={handleSubmit} resultFilter={handleFilter} />
      <div className='flex-1 flex overflow-x-scroll keep-scrolling items-center'>
        {tags.map(tag => {

          const onTagClick = () => {

          }

          const onTagDelete = () => {
            setTags(prev => prev.filter(t => t.id !== tag.id))
          }

          return <Tag key={tag.id} tag={tag} faded={false} onClick={onTagClick} editMode={true} onDelete={onTagDelete} />
        })}
      </div>
      <Button type="button" >clear filter</Button>
    </div>
  )
}

export default FilterTags
