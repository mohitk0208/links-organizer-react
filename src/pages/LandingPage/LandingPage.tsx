import React from 'react'
import LandingPageNavbar from '../../components/LandingPageComponents/LandingPageNavbar'
import LandingPageCover from '../../components/LandingPageComponents/LandingPageCover'
import LandingPageBenefitsSection from '../../components/LandingPageComponents/LandingPageBenefitsSection'
// import LandingPageContributeSection from '../../components/LandingPageComponents/LandingPageContributeSection'
import LandingPageTechStack from '../../components/LandingPageComponents/LandingPageTechStack'
import LandingPageComparisonSection from '../../components/LandingPageComponents/LandingPageComparisonSection'
import LandingPageReportOrRequest from '../../components/LandingPageComponents/LandingPageReportOrRequest'

function LandingPage() {
  return (
    <div className="" >
      <LandingPageNavbar />
      <LandingPageCover />
      <LandingPageBenefitsSection />
      <LandingPageComparisonSection />
      <LandingPageTechStack />
      <LandingPageReportOrRequest />
      {/* <LandingPageContributeSection /> */}
    </div>
  )
}

export default LandingPage
