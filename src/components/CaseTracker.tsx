import React from 'react'
import { Check, Clock, XCircle } from 'lucide-react'

interface CaseTrackerProps {
  steps: string[]
  currentStep: number
  finalStatus: 'turned down' | 'referred out' | null
}

const CaseTracker: React.FC<CaseTrackerProps> = ({ steps, currentStep, finalStatus }) => {
  return (
    <div className="mb-4">
      <div className="relative">
        <div className="flex items-stretch bg-gray-200 rounded-full h-8 p-1">
          <div
            className={`absolute left-0 top-0 h-full bg-teal-500 rounded-full transition-all duration-300`}
            style={{ 
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
              maxWidth: 'calc(100% - 0.5rem)'
            }}
          ></div>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 flex items-center justify-center rounded-full transition-all duration-300 ${
                index < currentStep || (index === currentStep && finalStatus)
                  ? 'text-white'
                  : index === currentStep
                  ? 'text-yellow-500'
                  : 'text-gray-500 hover:bg-gray-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index < currentStep || (index === currentStep && finalStatus === 'referred out')
                  ? 'bg-white text-teal-500'
                  : index === currentStep
                  ? 'bg-white text-yellow-500'
                  : 'bg-gray-400 text-white'
              }`}>
                {index < currentStep ? (
                  <Check size={12} />
                ) : index === currentStep && step === 'Under Review' ? (
                  <Clock size={12} />
                ) : index === steps.length - 1 && finalStatus === 'turned down' ? (
                  <XCircle size={12} />
                ) : index === steps.length - 1 && finalStatus === 'referred out' ? (
                  <Check size={12} />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1 px-1">
          {steps.map((step, index) => (
            <span key={index} className="text-xs font-medium text-gray-600 text-center" style={{width: `${100 / steps.length}%`}}>
              {index === steps.length - 1 && finalStatus ? 
                (finalStatus === 'referred out' ? 'Referred Out' : 'Turned Down') : 
                step}
            </span>
          ))}
        </div>
      </div>
      {finalStatus && (
        <div className="mt-2 text-center text-sm font-semibold">
          {finalStatus === 'referred out' ? (
            <span className="text-green-500">Case Referred Out</span>
          ) : (
            <span className="text-red-500">Case Turned Down</span>
          )}
        </div>
      )}
    </div>
  )
}

export default CaseTracker