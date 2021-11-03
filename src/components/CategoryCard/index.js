import React from 'react'

function CategoryCard({ category, onClick }) {

  const {
    id,
    name

  } = category

  return (
    <div className="w-full h-32 border border-purple-500 rounded-sm flex bg-purple-100/50 items-end hover:shadow-md  " >
      <p className="w-full text-center py-2 h-10 bg-purple-300 cursor-pointer hover:bg-purple-400 transition duration-200 ease-in-out " onClick={onClick} >{name}</p>
    </div>
  )
}

export default CategoryCard
