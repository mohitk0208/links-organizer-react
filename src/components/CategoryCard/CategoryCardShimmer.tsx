import React from 'react'

function CategoryCardShimmer() {
  return (
    <div className="w-full h-32 border border-purple-500 rounded-lg flex bg-purple-100/50 items-end hover:shadow-md animate-pulse  " >
      <p className="w-full text-center py-2 h-10 bg-purple-300 cursor-pointer hover:bg-purple-400 transition duration-200 ease-in-out "></p>
    </div>
  )
}

export default CategoryCardShimmer
