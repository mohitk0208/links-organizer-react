import React from "react";
import BenefitCard from "./BenefitCard";
import PortfloioImg from "../../../assets/illustrations/undraw_portfolio_re_qwm5.svg";
import TasksImg from "../../../assets/illustrations/undraw_accept_tasks_re_09mv.svg";
import ImagesImg from "../../../assets/illustrations/undraw_images_re_0kll.svg";



const benefits = [
  {
    title: "Multiple Categories",
    description: "You can create Multiple Categories and add links to them so as to better organize your links.",
    image: PortfloioImg
  },
  {
    title: "Attach Tags",
    description: "Attach Tags to the saved Urls so that you can easily find the links you are looking for.",
    image: TasksImg
  },
  {
    title: "Category Background",
    description: "Adding background to the categories not only make it look more appealing but also make it more easy to locate.",
    image: ImagesImg
  },
]

const LandingPageBenefitsSection = () => {

  return (
    <section className='w-full my-5 flex flex-col items-center pb-10 mb-20'>
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