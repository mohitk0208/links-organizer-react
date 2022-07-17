import React from "react"
import { openInNewTab } from "../../../utils/functions"
import Button from "../../utilComponents/Button"


const ReportIssueLink = "https://github.com/mohitk0208/links-organizer-react/issues/new?labels=bug&assignees=mohitk0208&title=Bug"

const RequestFeatureLink = "https://github.com/mohitk0208/links-organizer-react/issues/new?labels=enhancement&assignees=mohitk0208&title=Amazing%20feature%20title"


const LandingPageReportOrRequest = () => {

  return (
    <section className="w-full bg-purple-50/50 mt-5 flex flex-col items-center pt-20 pb-28 mb-10" >
      <h2 className="font-bold text-3xl my-5">
        Report Issue Or Request Feature
      </h2>

      <div className="w-3/6">
        <p className="text-center opacity-70 mb-10" >
          This is an Open Source Project and you can report any issue or request feature and contribute in making the product better.
        </p>

        <div className="flex justify-center gap-4" >
          <Button variant="danger" onClick={() => openInNewTab(ReportIssueLink)}>
            Report Issue
          </Button>

          <Button onClick={() => openInNewTab(RequestFeatureLink)}>
            Request Feature
          </Button>

        </div>

      </div>

    </section >
  )
}

export default LandingPageReportOrRequest