import React from 'react'
import { Check, Clock, XCircle } from 'lucide-react'

interface SegmentedCaseTrackerProps {
  steps: string[]
  currentStep: number
  finalStatus: 'turned down' | 'referred out' | null
}

const SegmentedCaseTracker: React.FC<SegmentedCaseTrackerProps> = ({ steps, currentStep, finalStatus }) => {
  const getSegmentColor = (index: number) => {
    if (finalStatus === 'referred out') {
      return 'bg-green-500'
    } else if (finalStatus === 'turned down') {
      return index === steps.length - 1 ? 'bg-red-500' : 'bg-primary'
    } else if (index < currentStep) {
      return 'bg-primary'
    } else if (index === currentStep) {
      return 'bg-yellow-500'
    }
    return 'bg-gray-200'
  }

  const getIconColor = (index: number) => {
    if (finalStatus === 'referred out') {
      return 'text-green-500'
    } else if (finalStatus === 'turned down' && index === steps.length - 1) {
      return 'text-red-500'
    } else if (index < currentStep) {
      return 'text-primary'
    } else if (index === currentStep) {
      return 'text-yellow-500'
    }
    return 'text-gray-400'
  }

  return (
    <div className="mb-4">
      <div className="relative">
        <div className="flex items-stretch bg-gray-200 rounded-full h-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 flex items-center justify-center transition-all duration-300 ${
                index === 0 ? 'rounded-l-full' : index === steps.length - 1 ? 'rounded-r-full' : ''
              } ${getSegmentColor(index)} ${
                index <= currentStep || finalStatus ? 'text-white' : 'text-gray-500'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-white ${getIconColor(index)}`}>
                {index < currentStep || finalStatus === 'referred out' || (finalStatus === 'turned down' && index < steps.length - 1) ? (
                  <Check size={12} />
                ) : index === currentStep && step === 'Under Review' ? (
                  <Clock size={12} />
                ) : index === steps.length - 1 && finalStatus === 'turned down' ? (
                  <XCircle size={12} />
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

export default SegmentedCaseTracker