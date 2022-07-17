import React from "react"
import { ReactComponent as LinkedinIcon } from "../../../assets/icons/linkedin.svg"
import { ReactComponent as GithubIcon } from "../../../assets/icons/github.svg"

const socialLinks = [
  {
    url: "https://www.linkedin.com/in/dev-mohit-kumar/",
    name: "linkedin",
    Icon: <LinkedinIcon className="w-6" />
  },
  {
    url: "https://github.com/mohitk0208",
    name: "github",
    Icon: <GithubIcon className="w-6" />
  }
]


const LandingPageFooter = () => {
  return (
    <section className="w-full mt-5 flex flex-col items-center pt-10 pb-10" >
      <h2 className="font-bold text-3xl my-5">
        Find me At
      </h2>

      <div className="3/6 flex justify-around " >
        {socialLinks.map(link => (
          <SocialMediaLink key={link.name} {...link} />
        ))}

      </div>

    </section>

  )

}


const SocialMediaLink = ({ url, name, Icon }: { url: string, name: string, Icon: React.ReactNode }) => {
  return (
    <a
      className="opacity-50 hover:opacity-100 transition-opacity duration-200 ease-in-out flex items-center justify-center px-2" href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {Icon}
      {name}
    </a>
  )
}


export default LandingPageFooter