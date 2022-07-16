import React from "react";

const LandingPageContributeSection = () => {

  return (
    <section className="w-full bg-purple-50/50 mt-5 flex flex-col items-center pt-10 pb-20 mb-10" >
      <h2 className="font-bold text-3xl my-5">
        Contribute to the project
      </h2>
      <div className="w-4/6 m-auto" >
        <p className="text-lg">
          This is an Open Source project. You can contribute to it by following these easy steps:
        </p>
        <ol className="list-decimal ml-5 flex flex-col gap-2 mt-3 opacity-80">
          <li className="">
            Fork this project on <a className="text-purple-400 hover:text-purple-600 transition-colors" href="https://github.com/mohitk0208/links-organizer-react/fork">github.com/mohitk0208/links-organizer-react/fork</a>
          </li>
          <li>
            Create your Feature Branch (<code className="bg-purple-200/70 px-2 py-1 rounded-md">git checkout -b feature/AmazingFeature</code>)
          </li>
          <li>
            Commit your Changes (<code className="bg-purple-200/70 px-2 py-1 rounded-md">git commit -m 'Add some AmazingFeature'</code> )
          </li>
          <li>
            Push to the Branch (<code className="bg-purple-200/70 px-2 py-1 rounded-md">git push origin feature/AmazingFeature</code> )
          </li>
          <li>
            Open a Pull Request
          </li>
        </ol>
      </div>
    </section>
  )

}

export default LandingPageContributeSection;