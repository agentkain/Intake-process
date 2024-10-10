import React, { useState } from 'react'
import Dashboard from './components/Dashboard'
import StepForm from './components/StepForm'
import RetainerAgreement from './components/RetainerAgreement'
import Sidebar from './components/Sidebar'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'
import DocumentsPage from './components/DocumentsPage'
import CaseDetails from './components/CaseDetails'
import { ArrowLeft } from 'lucide-react'
import LIALogo from './components/LIALogo'
import { HashRouter as Router } from 'react-router-dom'

const caseSteps = [
  'Intake Form',
  'Retainer Agreement',
  'Under Review',
  'Case Decision'
]

function App() {
  const [currentCaseStep, setCurrentCaseStep] = useState(0)
  const [finalStatus, setFinalStatus] = useState<'turned down' | 'referred out' | null>(null)
  const [showIntakeForm, setShowIntakeForm] = useState(false)
  const [showRetainerAgreement, setShowRetainerAgreement] = useState(false)
  const [showDocumentsPage, setShowDocumentsPage] = useState(false)
  const [showCaseDetails, setShowCaseDetails] = useState(false)
  const [intakeForms, setIntakeForms] = useState<any[]>([])
  const [selectedCaseDetails, setSelectedCaseDetails] = useState<any>(null)
  const [completedFormData, setCompletedFormData] = useState<any>(null)

  const handleNextCaseStep = () => {
    if (currentCaseStep < caseSteps.length - 1) {
      setCurrentCaseStep(currentCaseStep + 1)
    }
  }

  const handleSubmit = (status: 'turned down' | 'referred out') => {
    setFinalStatus(status)
    setCurrentCaseStep(3) // Both statuses end at the final step
  }

  const handleExitForm = () => {
    setShowIntakeForm(false)
    setShowRetainerAgreement(false)
    setShowDocumentsPage(false)
    setShowCaseDetails(false)
  }

  const handleIntakeFormComplete = (formData: any) => {
    setCompletedFormData(formData)
    setIntakeForms([...intakeForms, formData])
    setShowIntakeForm(false)
    setShowRetainerAgreement(true)
    handleNextCaseStep()
  }

  const handleRetainerAgreementComplete = () => {
    handleNextCaseStep()
    setTimeout(() => {
      handleNextCaseStep()
      setShowRetainerAgreement(false)
    }, 2000)
  }

  const handleStartIntake = () => {
    setShowIntakeForm(true)
  }

  const handleOpenRetainer = () => {
    setShowRetainerAgreement(true)
  }

  const handleOpenDocuments = () => {
    setShowDocumentsPage(true)
  }

  const handleViewCaseDetails = (formData: any) => {
    setSelectedCaseDetails(formData)
    setShowCaseDetails(true)
    setShowDocumentsPage(false)
  }

  const handleNavigate = (page: string) => {
    if (page === 'documents') {
      setShowDocumentsPage(true)
      setShowIntakeForm(false)
      setShowRetainerAgreement(false)
      setShowCaseDetails(false)
    } else if (page === 'dashboard') {
      setShowDocumentsPage(false)
      setShowIntakeForm(false)
      setShowRetainerAgreement(false)
      setShowCaseDetails(false)
    }
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex flex-1">
          <Sidebar onNavigate={handleNavigate} />
          <div className="flex-1 flex flex-col">
            <div className="flex-grow">
              {(showIntakeForm || showRetainerAgreement || showDocumentsPage || showCaseDetails) && (
                <button
                  onClick={handleExitForm}
                  className="absolute top-4 right-4 flex items-center text-blue-600 hover:text-red-600 transition-colors duration-200 z-10"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Exit to Dashboard
                </button>
              )}
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <LIALogo className="text-blue-600 mr-2 w-8 h-8" />
                  <h1 className="text-3xl font-bold text-blue-800">Case Dashboard</h1>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  {showIntakeForm ? (
                    <StepForm
                      onComplete={handleIntakeFormComplete}
                      onSubmit={handleSubmit}
                      currentStep={currentCaseStep}
                      finalStatus={finalStatus}
                    />
                  ) : showRetainerAgreement ? (
                    <RetainerAgreement onComplete={handleRetainerAgreementComplete} />
                  ) : showDocumentsPage ? (
                    <DocumentsPage intakeForms={intakeForms} onViewCaseDetails={handleViewCaseDetails} />
                  ) : showCaseDetails ? (
                    <CaseDetails
                      caseNumber={Math.floor(100000 + Math.random() * 900000)}
                      finalStatus={finalStatus}
                      currentStep={currentCaseStep}
                      formData={selectedCaseDetails || completedFormData}
                    />
                  ) : (
                    <Dashboard
                      currentStep={currentCaseStep}
                      finalStatus={finalStatus}
                      onStartIntake={handleStartIntake}
                      onOpenRetainer={handleOpenRetainer}
                      onOpenDocuments={handleOpenDocuments}
                    />
                  )}
                </div>
                <div className="mt-8 text-sm text-gray-600">
                  <p className="mb-2 text-center text-lg">For assistance, call: <span className="font-semibold"><a href="tel:855-542-5555" className="text-[#da291c]">855-LIA-5555</a></span></p>
                  <p className="text-xs">
                    Legal Injury Advocates is a trade name of Saddle Rock Legal Group LLC. Shannon Overcash is responsible for the content of this communication. Her contact information is Saddle Rock Legal Group LLC, 7301 N. 16th Street, Suite 102, Phoenix, AZ 85020; <a href="tel:1-888-666-6454">1-888-666-6454</a>. She is admitted in Arizona, and not admitted in Kentucky. Images may not depict actual events or real persons. No representation is made that the quality of the legal services to be performed is greater than the quality of legal services performed by other lawyers. The choice of a lawyer is an important decision and should not be based on advertisements alone. FREE BACKGROUND INFORMATION AVAILABLE UPON REQUEST. Some cases may be referred to co-counsel depending on nature and venue of a particular case. In cases in which Saddle Rock Legal Group LLC associates with other counsel, Saddle Rock Legal Group LLC maintains joint responsibility for the case in accordance with the rules of the particular state and with informed consent of the client. This information does not create any legal relationship between The Saddle Rock Legal Group LLC, its lawyers, agents or co-counsel and any viewer or user. The receipt or transmission of information through such communication does not create an attorney- client relationship. An attorney-client relationship is not formed by reading this communication, by calling a telephone number appearing in an ad, by sending email communications or submitting a form. An attorney-client relationship is formed only by express written mutual agreement through a retainer contract. Your use of information through this communication is at your own risk. Under no circumstances will Saddle Rock Group LLC, any of its lawyers, agents or co-counsel be liable to you or any other individual for any special, indirect, consequential, or incidental damages arising out of the use of, or access to, this information. Legal services do not include those involving Florida or Louisiana law. Cases not accepted for matters in Florida and Louisiana. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <Chatbot />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App