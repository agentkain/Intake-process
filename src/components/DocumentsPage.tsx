import React from 'react'
import { FileText } from 'lucide-react'

interface DocumentsPageProps {
  intakeForms: any[]
  onViewCaseDetails: (formData: any) => void
}

const DocumentsPage: React.FC<DocumentsPageProps> = ({ intakeForms, onViewCaseDetails }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Documents</h2>
      <div className="space-y-4">
        {intakeForms.map((form, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="text-blue-500 mr-2" size={24} />
                <span className="text-lg font-medium">Intake Form #{index + 1}</span>
              </div>
              <button
                onClick={() => onViewCaseDetails(form)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                View Case Details
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <p>Name: {form.personalInformation.firstName} {form.personalInformation.lastName}</p>
              <p>Submitted on: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocumentsPage