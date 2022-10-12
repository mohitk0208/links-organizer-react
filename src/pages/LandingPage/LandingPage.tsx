import React, { lazy, Suspense } from 'react'
import SuspenseFallback from '../../components/SuspenseFallback'
const LandingPageNavbar = lazy(() => import('../../components/LandingPageComponents/LandingPageNavbar'))
const LandingPageCover = lazy(() => import('../../components/LandingPageComponents/LandingPageCover'))
const LandingPageBenefitsSection = lazy(() => import('../../components/LandingPageComponents/LandingPageBenefitsSection'))
const LandingPageTechStack = lazy(() => import('../../components/LandingPageComponents/LandingPageTechStack'))
const LandingPageComparisonSection = lazy(() => import('../../components/LandingPageComponents/LandingPageComparisonSection'))
const LandingPageReportOrRequest = lazy(() => import('../../components/LandingPageComponents/LandingPageReportOrRequest'))
const LandingPageFooter = lazy(() => import('../../components/LandingPageComponents/LandingPageFooter'))
// import LandingPageContributeSection from '../../components/LandingPageComponents/LandingPageContributeSection'

function LandingPage() {
  return (
    <div className="" >
      <Suspense fallback={<SuspenseFallback />} >
        <LandingPageNavbar />
        <LandingPageCover />
        <LandingPageBenefitsSection />
        <LandingPageComparisonSection />
        <LandingPageTechStack />
        <LandingPageReportOrRequest />
        <LandingPageFooter />
      </Suspense>
      {/* <LandingPageContributeSection /> */}
    </div>
  )
}

export default LandingPage
