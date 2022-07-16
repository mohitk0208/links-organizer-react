import React from 'react'
import LandingPageNavbar from '../../components/LandingPageComponents/LandingPageNavbar'
import LandingPageCover from '../../components/LandingPageComponents/LandingPageCover'
import LandingPageBenefitsSection from '../../components/LandingPageComponents/LandingPageBenefitsSection'
import LandingPageContributeSection from '../../components/LandingPageComponents/LandingPageContributeSection'

function LandingPage() {
  return (
    <div className="" >
      <LandingPageNavbar />
      <LandingPageCover />
      <LandingPageBenefitsSection />
      <LandingPageContributeSection />
    </div>
  )
}

export default LandingPage
