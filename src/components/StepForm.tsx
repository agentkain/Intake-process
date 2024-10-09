import React, { useState } from 'react'
import FormStepTracker from './FormStepTracker'
import { OpeningAgreements, PersonalInformation, Qualification, MedicalVerification } from './FormStepComponents'

interface StepFormProps {
  onComplete: (formData: any) => void
  onSubmit: (status: 'turned down' | 'referred out') => void
  currentStep: number
  finalStatus: 'turned down' | 'referred out' | null
}

const StepForm: React.FC<StepFormProps> = ({
  onComplete,
  onSubmit,
  currentStep,
  finalStatus
}) => {
  const [currentFormStep, setCurrentFormStep] = useState(0)
  const [formData, setFormData] = useState({
    openingAgreements: {},
    personalInformation: {},
    qualification: {},
    medicalVerification: {}
  })

  const formSteps = [
    { name: 'Opening Agreements', key: 'openingAgreements' },
    { name: 'Personal Information', key: 'personalInformation' },
    { name: 'Qualification', key: 'qualification' },
    { name: 'Medical Verification', key: 'medicalVerification' }
  ]

  const handleNextStep = (stepData: any) => {
    const updatedFormData = { ...formData, [formSteps[currentFormStep].key]: stepData }
    setFormData(updatedFormData)
    if (currentFormStep < formSteps.length - 1) {
      setCurrentFormStep(currentFormStep + 1)
    } else {
      onComplete(updatedFormData)
    }
  }

  const handlePrevStep = () => {
    if (currentFormStep > 0) {
      setCurrentFormStep(currentFormStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentFormStep) {
      case 0:
        return <OpeningAgreements onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
      case 1:
        return <PersonalInformation onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
      case 2:
        return <Qualification onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
      case 3:
        return <MedicalVerification onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
      default:
        return null
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Intake Form</h2>
      <FormStepTracker steps={formSteps.map(step => step.name)} currentStep={currentFormStep} />
      <div className="mt-8">
        {renderStepContent()}
      </div>
    </div>
  )
}

export default StepForm
