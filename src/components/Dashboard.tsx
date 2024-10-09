import React, { useState } from 'react'
import { ClipboardList, FileText, Folder } from 'lucide-react'
import SegmentedCaseTracker from './SegmentedCaseTracker'
import CaseDetails from './CaseDetails'

interface DashboardProps {
  currentStep: number
  finalStatus: 'turned down' | 'referred out' | null
  onStartIntake: () => void
  onOpenRetainer: () => void
  onOpenDocuments: () => void
}

const Dashboard: React.FC<DashboardProps> = ({
  currentStep,
  finalStatus,
  onStartIntake,
  onOpenRetainer,
  onOpenDocuments
}) => {
  const [localFinalStatus, setLocalFinalStatus] = useState<'turned down' | 'referred out' | null>(finalStatus)

  const steps = [
    'Intake Form',
    'Retainer Agreement',
    'Under Review',
    'Case Decision'
  ]

  // Generate a random 6-digit case number
  const caseNumber = Math.floor(100000 + Math.random() * 900000)

  const handleDecision = (decision: 'turned down' | 'referred out') => {
    setLocalFinalStatus(decision)
    // Here you would typically update the backend with the decision
  }

  return (
    <div className="space-y-6">
      <CaseDetails caseNumber={caseNumber} finalStatus={localFinalStatus} currentStep={currentStep} />

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">Jane Doe - Roundup Case #{caseNumber}</h3>
        <h4 className="text-md font-medium mb-2 text-blue-700">Case Progress</h4>
        <SegmentedCaseTracker steps={steps} currentStep={currentStep} finalStatus={localFinalStatus} />
        <div className="mt-4 flex space-x-4">
          {currentStep === 0 && (
            <button
              onClick={onStartIntake}
              className="flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition duration-300"
            >
              <ClipboardList size={18} className="mr-2" />
              Start Intake Form
            </button>
          )}
          {currentStep === 1 && (
            <button
              onClick={onOpenRetainer}
              className="flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition duration-300"
            >
              <FileText size={18} className="mr-2" />
              Open Retainer Agreement
            </button>
          )}
          {currentStep > 0 && (
            <button
              onClick={onOpenDocuments}
              className="flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition duration-300"
            >
              <Folder size={18} className="mr-2" />
              View Documents
            </button>
          )}
        </div>
      </div>

      {currentStep === 2 && !localFinalStatus && (
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleDecision('referred out')}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition duration-300"
          >
            Refer Out
          </button>
          <button
            onClick={() => handleDecision('turned down')}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition duration-300"
          >
            Turn Down
          </button>
        </div>
      )}
    </div>
  )
}

export default Dashboard