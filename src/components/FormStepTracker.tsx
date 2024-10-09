import React from 'react'
import { Check } from 'lucide-react'

interface FormStepTrackerProps {
  steps: string[]
  currentStep: number
}

const FormStepTracker: React.FC<FormStepTrackerProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="relative">
        <div className="flex items-stretch bg-gray-200 rounded-full h-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 flex items-center justify-center transition-all duration-300 ${
                index === 0 ? 'rounded-l-full' : index === steps.length - 1 ? 'rounded-r-full' : ''
              } ${
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                  ? 'bg-yellow-500 text-white'
                  : 'text-gray-500'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index < currentStep
                  ? 'bg-white text-green-500'
                  : index === currentStep
                  ? 'bg-white text-yellow-500'
                  : 'bg-gray-400 text-white'
              }`}>
                {index < currentStep ? (
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
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FormStepTracker