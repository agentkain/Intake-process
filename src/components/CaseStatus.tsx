import React from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'

interface CaseStatusProps {
  currentStep: number
  steps: string[]
  finalStatus: 'turned down' | 'referred out' | null
}

const CaseStatus: React.FC<CaseStatusProps> = ({ currentStep, steps, finalStatus }) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Case Status</h2>
      <p className="mb-2">
        Current stage: <span className="font-medium">{steps[currentStep]}</span>
      </p>
      {finalStatus && (
        <div className="flex items-center mt-2">
          {finalStatus === 'referred out' ? (
            <CheckCircle className="text-green-500 mr-2" size={20} />
          ) : (
            <AlertCircle className="text-red-500 mr-2" size={20} />
          )}
          <span className={finalStatus === 'referred out' ? 'text-green-500' : 'text-red-500'}>
            Case {finalStatus === 'referred out' ? 'Referred Out' : 'Turned Down'}
          </span>
        </div>
      )}
    </div>
  )
}

export default CaseStatus