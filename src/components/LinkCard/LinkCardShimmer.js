import React from 'react'
import TagShimmer from '../utilComponents/Tag/TagShimmer'


function LinkCardShimmer() {

  return (
    <div className="p-2 pt-1 rounded-lg grid grid-cols-12 gap-1 drop-shadow-xl shadow-md border border-purple-500 " >

      <div className=" col-start-1 col-end-11 pl-2 mr-2 overflow-hidden" >
        <div className="text-xs bg-blue-200/50 h-2 my-2 hover:text-blue-600 rounded  "  ></div>
      </div>

      <div className="col-start-11 col-end-13 flex gap-2 text-center justify-around " >
        <div className="h-4 w-4 bg-purple-300 rounded-md" ></div>
        <div className="h-4 w-4 bg-purple-300 rounded-md" ></div>
        <div className="h-4 w-4 bg-purple-300 rounded-md" ></div>
      </div>


      <div className="col-start-1 col-end-2 rounded bg-purple-100" >
        <img src="https://picsum.photos/200" alt="" className="rounded " style={{ aspectRatio: 1 }} />
      </div>

      <div className="col-start-2 col-end-13 p-2 bg-purple-300/20 rounded h-16 " >
        <p className="text-sm text-purple-900" ></p>
      </div>

      <div className="col-start-2 col-end-13 flex flex-wrap gap-2" >
        {[...Array(5)].map((tag, index) => {
          return <TagShimmer key={index} />
        })}
      </div>


    </div>
  )
}

export default LinkCardShimmer