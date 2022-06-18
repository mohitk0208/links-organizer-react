import React from 'react'
import { CategoryType } from '../../types/categoriesSliceTypes'

function CategoryInfoGrid({ category }: { category: CategoryType }) {
  return (
    <div className="grid grid-cols-2 gap-1.5 text-gray-600" >
      <p>Category Name</p>
      <p>{category.name}</p>

      <p>Category Description</p>
      <p>{category.description}</p>

      <p>Category Background</p>
      <p>
        <img src={category.background_url} className=" w-32 aspect-video object-cover" alt="category background" />
      </p>

      <p>Owner</p>
      <p className="flex items-center gap-2">
        <img src={category.owner_avatar} className="h-8 w-8 rounded-full" alt="owner avatar" />
        {category.owner_username}
      </p>

    </div>
  )
}

export default CategoryInfoGrid