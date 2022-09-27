import React from "react"
import { CheckIcon, XIcon } from "@heroicons/react/solid"


interface RowProps {
  col1: string | React.ReactNode,
  col2: string | React.ReactNode,
  col3: string | React.ReactNode
}

const comparisonPoints = [
  {
    col1: "Make Multiple Categories",
    col2: <CheckIcon className="text-green-500 w-6 m-auto " />,
    col3: <XIcon className="text-red-500 w-6 m-auto " />
  },
  {
    col1: "Attach tags to saved Urls ",
    col2: <CheckIcon className="text-green-500 w-6 m-auto " />,
    col3: <XIcon className="text-red-500 w-6 m-auto " />
  },
  {
    col1: "Filtering Urls based on multiple parameters such as tags/categories ",
    col2: <CheckIcon className="text-green-500 w-6 m-auto " />,
    col3: <XIcon className="text-red-500 w-6 m-auto " />
  },
  {
    col1: "Search Functionality",
    col2: <CheckIcon className="text-green-500 w-6 m-auto " />,
    col3: <XIcon className="text-red-500 w-6 m-auto " />
  }

]

const LandingPageComparisonSection = () => {
  return (
    <section className="w-full bg-purple-50/50 mt-5 flex flex-col items-center pt-20 pb-28 mb-10" >
      <h2 className="font-bold text-3xl my-5">
        Comparison With Bookmarking Feature
      </h2>

      <div className="w-4/6">

        <p className="w-5/6 m-auto opacity-70 text-center mb-10">
          This platform features are  very much similar to the bookmarking feature of the web. But there are some features that help you store and manage your URLs in a much better way.
        </p>


        <table className="shadow-md  bg-white/70 border border-gray-200/50 rounded-lg m-auto">
          <HeadingRow col1="Feature" col2="Links Organizer" col3="Bookmarking" />

          {comparisonPoints.slice(0, comparisonPoints.length - 1).map(point => (
            <NormalRow key={point.col1} {...point} />
          ))}

          <LastRow {...comparisonPoints[comparisonPoints.length - 1]} />
        </table>
      </div>

    </section>
  )
}




const HeadingRow = ({ col1, col2, col3 }: RowProps) => {
  return (
    <thead>
      <tr className="border-b bg-purple-100 rounded-t-lg">
        <th className="border-b border-r text-left px-8 py-4">{col1}</th>
        <th className="border-b border-r text-left px-8 py-4">{col2}</th>
        <th className="border-b text-left px-8 py-4">{col3}</th>
      </tr>
    </thead>
  )
}

const NormalRow = ({ col1, col2, col3 }: RowProps) => {
  return (
    <tbody>
      <tr>
        <td className=" border-b border-r px-8 py-4">{col1}</td>
        <td className=" border-b border-r px-8 py-4">
          {col2}
        </td>
        <td className=" border-b px-8 py-4">
          {col3}
        </td>
      </tr>
    </tbody>
  )
}

const LastRow = ({ col1, col2, col3 }: RowProps) => {
  return (
    <tfoot>
      <tr>
        <td className="border-r px-8 py-4">
          {col1}
        </td>
        <td className="border-r px-8 py-4">
          {col2}
        </td>
        <td className=" px-8 py-4">
          {col3}
        </td>
      </tr>
    </tfoot>
  )
}


export default LandingPageComparisonSection