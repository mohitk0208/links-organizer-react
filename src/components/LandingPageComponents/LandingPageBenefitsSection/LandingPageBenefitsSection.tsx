import React from "react";
import BenefitCard from "./BenefitCard";


const benefits = [
  {
    title: "Organize your links 1",
    description: "Organize your Links in a better way",
    image: "https://picsum.photos/500"
  },
  {
    title: "Organize your links 2",
    description: "Organize your Links in a better way",
    image: "https://picsum.photos/500"
  },
  {
    title: "Organize your links 3",
    description: "Organize your Links in a better way",
    image: "https://picsum.photos/500"
  },
]

const LandingPageBenefitsSection = () => {

  return (
    <section className='w-full my-5 flex flex-col items-center pb-10 mb-10'>
      <h2 className='font-bold text-3xl my-5' >
        Benefits of Links Organizer
      </h2>

      <div className=' w-4/5 flex py-6 px-5 justify-around'>


        {benefits.map(benefit => (
          <BenefitCard key={benefit.title} {...benefit} />
        ))}


      </div>

    </section>
  )

}

export default LandingPageBenefitsSection