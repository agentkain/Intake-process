import React from 'react'
import { FileText, AlertTriangle, Mail, Phone, Users, Upload, Clock } from 'lucide-react'

interface CaseDetailsProps {
  caseNumber: number
  finalStatus: 'turned down' | 'referred out' | null
  currentStep: number
  formData?: any
}

const CaseDetails: React.FC<CaseDetailsProps> = ({ caseNumber, finalStatus, currentStep, formData }) => {
  const renderFormSection = (title: string, data: any) => {
    if (!data) return null;
    return (
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        {Object.entries(data).map(([key, value]) => (
          <p key={key} className="text-sm">
            <span className="font-medium">{key}: </span>
            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
          </p>
        ))}
      </div>
    )
  }

  const getStatusInfo = () => {
    if (finalStatus === 'turned down') {
      return { text: 'Turned Down', color: 'text-red-500', icon: AlertTriangle }
    } else if (finalStatus === 'referred out') {
      return { text: 'Referred Out', color: 'text-green-500', icon: AlertTriangle }
    } else if (currentStep === 2) {
      return { text: 'Under Review', color: 'text-yellow-500', icon: Clock }
    } else {
      return { text: 'In Progress', color: 'text-blue-500', icon: AlertTriangle }
    }
  }

  const { text: statusText, color: statusColor, icon: StatusIcon } = getStatusInfo()

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Case Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <FileText className="text-blue-500 mr-2" size={20} />
          <span className="text-gray-700">Case Number: {caseNumber}</span>
        </div>
        <div className="flex items-center">
          <StatusIcon className={`${statusColor} mr-2`} size={20} />
          <span className={statusColor}>Status: {statusText}</span>
        </div>
        {formData && formData.personalInformation && (
          <>
            <div className="flex items-center">
              <Mail className="text-blue-500 mr-2" size={20} />
              <span className="text-gray-700">Email: {formData.personalInformation.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="text-blue-500 mr-2" size={20} />
              <span className="text-gray-700">Phone: {formData.personalInformation.phone}</span>
            </div>
          </>
        )}
        {finalStatus === 'referred out' && (
          <div className="flex items-center col-span-2">
            <Users className="text-blue-500 mr-2" size={20} />
            <span className="text-gray-700">Referral Partner: Kline & Specter, P.C., LLC</span>
          </div>
        )}
      </div>
      {formData && (
        <>
          {renderFormSection('Opening Agreements', formData.openingAgreements)}
          {renderFormSection('Personal Information', formData.personalInformation)}
          {renderFormSection('Qualification', formData.qualification)}
          {renderFormSection('Medical Verification', formData.medicalVerification)}
        </>
      )}
      {formData && formData.medicalVerification && formData.medicalVerification.file && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Uploaded Medical Document</h4>
          <div className="flex items-center">
            <Upload className="text-blue-500 mr-2" size={20} />
            <span className="text-gray-700">{formData.medicalVerification.file.name}</span>
          </div>
        </div>
      )}
      {finalStatus === 'turned down' && (
        <div className="mt-4 text-sm text-gray-600">
          For more information, check your email or call us at (855) 542-5555
        </div>
      )}
    </div>
  )
}

export default CaseDetails