import React from "react";


interface BenefitCardProps {
  title: string;
  description: string;
  image: string;
}


const BenefitCard = ({ title, description, image }: BenefitCardProps) => {

  return (
    <div className='w-56 '>
      <div className="w-full aspect-video rounded-md overflow-hidden shadow-sm" >
        <img src={image} className='w-full h-full object-contain' alt="" />
      </div>
      <div className='text-center px-2 pt-1'>
        <h3 className='font-bold text-xl my-2'>
          {title}
        </h3>
        <p className='opacity-70 text-md'>
          {description}
        </p>
      </div>
    </div>
  )

}

export default BenefitCard;