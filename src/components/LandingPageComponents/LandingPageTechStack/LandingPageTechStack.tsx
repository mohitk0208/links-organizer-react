import React from "react";
import TechTag from "./TechTag";



const frontendTechs = [
  {
    name: "React",
    url: "https://reactjs.org/",
  },
  {
    name: "Redux",
    url: "https://redux.js.org/",
  },
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "tailwindcss",
    url: "https://tailwindcss.com/",
  },
  {
    name: "Redux Toolkit",
    url: "https://redux-toolkit.js.org/",
  }
]


const backendTechs = [
  {
    name: "Django",
    url: "https://www.djangoproject.com/",
  },
  {
    name: "Django REST Framework",
    url: "https://www.django-rest-framework.org/",
  }
]

const LandingPageTechStack = () => {
  return (
    <section className="w-full mt-5 flex flex-col items-center pt-10 pb-20 mb-10" >
      <h2 className="font-bold text-3xl my-5">
        Tech Stack of the Project
      </h2>

      <div className="w-4/6">
        <div>
          <h3 className="font-bold text-xl text-gray-700">
            Frontend tech
          </h3>
          <div className="pb-10 pt-5 px-2 flex gap-4" >
            {frontendTechs.map(tech => (
              <TechTag key={tech.name} {...tech} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl text-gray-700">
            Backend tech
          </h3>
          <div className="pb-10 pt-5 px-2 flex gap-4" >
            {backendTechs.map(tech => (
              <TechTag key={tech.name} {...tech} />
            ))}
          </div>
        </div>

      </div>

    </section>
  )
}

export default LandingPageTechStack;