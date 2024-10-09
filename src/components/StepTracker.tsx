import React from 'react'
import { Check } from 'lucide-react'

interface StepTrackerProps {
  steps: string[]
  currentStep: number
}

const StepTracker: React.FC<StepTrackerProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div className="w-full flex items-center">
            <div className={`flex-grow h-1 ${index === 0 ? 'bg-transparent' : index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
            >
              {index < currentStep ? (
                <Check size={16} />
              ) : null}
            </div>
            <div className={`flex-grow h-1 ${index === steps.length - 1 ? 'bg-transparent' : index < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          </div>
          <span className="text-xs mt-1 text-center">{step}</span>
        </div>
      ))}
    </div>
  )
}

export default StepTracker