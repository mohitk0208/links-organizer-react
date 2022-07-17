import React from 'react'
import LandingPageNavbar from '../../components/LandingPageComponents/LandingPageNavbar'
import LandingPageCover from '../../components/LandingPageComponents/LandingPageCover'
import LandingPageBenefitsSection from '../../components/LandingPageComponents/LandingPageBenefitsSection'
// import LandingPageContributeSection from '../../components/LandingPageComponents/LandingPageContributeSection'
import LandingPageTechStack from '../../components/LandingPageComponents/LandingPageTechStack'

function LandingPage() {
  return (
    <div className="" >
      <LandingPageNavbar />
      <LandingPageCover />
      <LandingPageBenefitsSection />
      <LandingPageTechStack />
      {/* <LandingPageContributeSection /> */}
    </div>
  )
}

export default LandingPage
