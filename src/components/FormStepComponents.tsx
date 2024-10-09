import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface StepProps {
  onNextStep: (data: any) => void
  onPrevStep: () => void
}

// OpeningAgreements component
const OpeningAgreements: React.FC<StepProps> = ({ onNextStep, onPrevStep }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [consent, setConsent] = useState<string>('')
  const [accurateInfo, setAccurateInfo] = useState<string>('')
  const [caseType, setCaseType] = useState<string>('Roundup')
  const [legalRepresentation, setLegalRepresentation] = useState<string>('')
  const [previousDocuments, setPreviousDocuments] = useState<string>('')
  const [fillingFor, setFillingFor] = useState<string>('')

  const slides = [
    {
      title: "Do you consent to Receive Notification on or Behalf of SRLG?",
      content: "If you agree to receive automated text notifications and phone calls by or on behalf of Saddle Rock to the number you are calling from regarding your potential case, please select \"Yes.\" Your consent is not a condition of purchase.",
      state: consent,
      setState: setConsent
    },
    {
      title: "Do you agree to provide accurate information?",
      content: "Your responses will be recorded exactly as you state them and reviewed by our staff and counsel. The information you provide is very important should you have a case. Additionally, you may be asked to verify your responses and/or information by affidavit so your complete honesty is very important. Do you agree to provide accurate information to the best of your knowledge?",
      state: accurateInfo,
      setState: setAccurateInfo
    },
    {
      title: "Please Confirm your Case type:",
      content: "",
      state: caseType,
      setState: setCaseType
    },
    {
      title: "Are you willing to affirm, under penalty, that you have not sought legal representation or advice from any other law firm or attorney for this specific matter?",
      content: "",
      state: legalRepresentation,
      setState: setLegalRepresentation
    },
    {
      title: "Have you previously signed documents, either physically or electronically, regarding this particular matter with any other law firm?",
      content: "",
      state: previousDocuments,
      setState: setPreviousDocuments
    },
    {
      title: "Are you filling on behalf of yourself or a loved one?",
      content: "",
      state: fillingFor,
      setState: setFillingFor
    }
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onNextStep({
        consent,
        accurateInfo,
        caseType,
        legalRepresentation,
        previousDocuments,
        fillingFor
      })
    }
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else {
      onPrevStep()
    }
  }

  const renderOptions = (options: string[], state: string, setState: React.Dispatch<React.SetStateAction<string>>) => {
    return options.map((option) => (
      <div key={option} className="flex items-center mt-2">
        <input
          type="radio"
          className="form-radio h-5 w-5 text-blue-600"
          name="radio-option"
          value={option}
          checked={state === option}
          onChange={() => setState(option)}
        />
        <label className="ml-2 text-gray-700">{option}</label>
      </div>
    ))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Opening Agreements</h2>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">{slides[currentSlide].title}</h3>
        <p className="mb-4">{slides[currentSlide].content}</p>
        <div className="space-y-2">
          {currentSlide === 2 ? (
            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="Roundup">Roundup</option>
              <option value="Talcum">Talcum</option>
              <option value="Necrotizing Enterocolitis (NEC)">Necrotizing Enterocolitis (NEC)</option>
              <option value="Paraquat">Paraquat</option>
              <option value="Hair Relaxer">Hair Relaxer</option>
            </select>
          ) : currentSlide === 5 ? (
            renderOptions(['Self', 'Loved one'], slides[currentSlide].state, slides[currentSlide].setState)
          ) : (
            renderOptions(['Yes', 'No'], slides[currentSlide].state, slides[currentSlide].setState)
          )}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          className={`px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-300 ${
            currentSlide === 0 ? 'invisible' : ''
          }`}
        >
          <ChevronLeft size={20} className="inline mr-2" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-[#00263e] text-white rounded hover:bg-[#da291c] transition duration-300"
        >
          {currentSlide === slides.length - 1 ? 'Next' : 'Continue'}
          <ChevronRight size={20} className="inline ml-2" />
        </button>
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

// PersonalInformation component
const PersonalInformation: React.FC<StepProps> = ({ onNextStep, onPrevStep }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    aptSuite: '',
    ssn: '',
    dateOfBirth: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, ssn: value });
  }

  const fields = [
    [
      { id: "firstName", label: "First Name", type: "text", width: "w-1/2" },
      { id: "lastName", label: "Last Name", type: "text", width: "w-1/2" }
    ],
    [
      { id: "phone", label: "Phone Number", type: "tel", width: "w-1/2" },
      { id: "email", label: "Email Address", type: "email", width: "w-1/2" }
    ],
    [
      { id: "address", label: "Street Address", type: "text", width: "w-3/4" },
      { id: "aptSuite", label: "Apt/Suite Number", type: "text", width: "w-1/4" }
    ],
    [
      { id: "city", label: "City", type: "text", width: "w-full" }
    ],
    [
      { id: "state", label: "State", type: "select", width: "w-1/2" },
      { id: "zipCode", label: "Zip Code", type: "text", width: "w-1/2" }
    ]
  ]

  const renderField = (field: { id: string; label: string; type: string; width: string }) => {
    if (field.type === "select" && field.id === "state") {
      return (
        <div key={field.id} className={field.width}>
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <select
            id={field.id}
            value={formData[field.id as keyof typeof formData]}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select State</option>
            {[
              "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
              "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
              "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
              "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
              "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
              "New Hampshire", "New Jersey", "New Mexico", "New York",
              "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
              "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
              "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
              "West Virginia", "Wisconsin", "Wyoming"
            ].map((state, index) => (
              <option key={index} value={state.slice(0, 2).toUpperCase()}>
                {state}
              </option>
            ))}
          </select>
        </div>
      );
    }
    return (
      <div key={field.id} className={field.width}>
        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}
        </label>
        <input
          type={field.type}
          id={field.id}
          value={formData[field.id as keyof typeof formData]}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
    )
  }

  const renderSSNAndDOBFields = () => (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Social Security Number and Date of Birth</h2>
      <div className="bg-gray-100 p-6 rounded-lg">
        <p className="mb-4 text-sm text-gray-600">
          We need your Social Security Number to verify your information. Your SSN is securely encrypted and only the last 4 digits will be visible.
        </p>
        <label htmlFor="ssn" className="block text-sm font-medium text-gray-700 mb-1">
          Social Security Number
        </label>
        <input
          type="text"
          id="ssn"
          value={formData.ssn.replace(/^(.{5})(.{4})$/, '*****-$2').replace(/^(.{3})(.{2})(.{4})$/, '$1-$2-$3')}
          onChange={(e) => {
            const value = e.target.value.replace(/[^\d-]/g, '');
            if (value.length <= 11) {
              const formattedValue = value.replace(/^(\d{0,3})(\d{0,2})(\d{0,4})$/, (_, p1, p2, p3) => {
                if (p3) return `${p1}-${p2}-${p3}`;
                if (p2) return `${p1}-${p2}`;
                return p1;
              });
              handleSSNChange({ target: { value: formattedValue } });
            }
          }}
          className="w-full p-2 border rounded-md"
          required
          placeholder="***-**-****"
        />
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1 mt-4">
          Date of Birth
        </label>
        <input
          type="date"
          id="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
    </div>
  )

  const handleNext = () => {
    if (currentSlide < 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onNextStep(formData);
    }
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      onPrevStep();
    }
  }

  return (
    <div className="space-y-6">
      {currentSlide === 0 ? (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="space-y-4">
              {fields.map((row, index) => (
                <div key={index} className="flex space-x-4">
                  {row.map(renderField)}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        renderSSNAndDOBFields()
      )}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-300"
        >
          <ChevronLeft size={20} className="inline mr-2" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-[#00263e] text-white rounded hover:bg-[#da291c] transition duration-300"
        >
          {currentSlide === 1 ? 'Next' : 'Continue'}
          <ChevronRight size={20} className="inline ml-2" />
        </button>
      </div>
    </div>
  )
}

// Qualification component
const Qualification: React.FC<StepProps> = ({ onNextStep, onPrevStep }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [formData, setFormData] = useState({
    cancerType: '',
    diagnosisDate: '',
    diagnosisYear: '',
    caseStatus: '',
    recurrence: '',
    recurrenceDate: '',
    diagnosisFacility: '',
    roundupStartDate: '',
    roundupUseDuration: '',
    roundupStopDate: '',
    lastUseBeforeDiagnosis: '',
    exposureType: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const slides = [
    {
      title: "Cancer Diagnosis",
      fields: [
        { id: "cancerType", label: "What type of cancer were you officially diagnosed with?", type: "select", options: [
          { value: "", label: "Select cancer type" },
          { value: "NHL", label: "Non-Hodgkin's Lymphoma (NHL)" },
          { value: "CLL", label: "Chronic Lymphocytic Leukemia (CLL)" },
          { value: "DLBCL", label: "Diffuse Large B Cell Lymphoma" },
          { value: "SLL", label: "Small Lymphocytic Lymphoma (SLL)" },
          { value: "HCL", label: "Hairy Cell Leukemia" },
          { value: "MCL", label: "Mantle Cell Lymphoma" },
          { value: "none", label: "No cancer or leukemia diagnosis" },
          { value: "other", label: "Other" }
        ]},
        { id: "diagnosisDate", label: "When did you receive your diagnosis?", type: "date" },
        { id: "diagnosisYear", label: "In which year were you diagnosed?", type: "number" }
      ]
    },
    {
      title: "Case Status",
      fields: [
        { id: "caseStatus", label: "What is your case status?", type: "select", options: [
          { value: "", label: "Select case status" },
          { value: "diagnosed2004", label: "Diagnosed between 2004 and present" },
          { value: "diagnosedBefore2004", label: "Diagnosed before 2004" },
          { value: "recurrenceAfter2004", label: "Diagnosed before 2004 with a recurrence after 2004" },
          { value: "deceased", label: "Deceased" },
          { value: "unsure", label: "Unsure" },
          { value: "unknown", label: "Unknown" }
        ]},
        { id: "recurrence", label: "Have there been any recurrences of your cancer?", type: "select", options: [
          { value: "", label: "Select option" },
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "unknown", label: "Unknown" }
        ]},
        { id: "recurrenceDate", label: "When did the recurrence occur?", type: "date", condition: (data) => data.recurrence === 'yes' },
        { id: "diagnosisFacility", label: "What is the name and address of the facility where you were diagnosed?", type: "textarea" }
      ]
    },
    {
      title: "Roundup Usage",
      fields: [
        { id: "roundupStartDate", label: "Approximately when did you start using Roundup?", type: "date" },
        { id: "roundupUseDuration", label: "How long did you use Roundup before your diagnosis?", type: "select", options: [
          { value: "", label: "Select option" },
          { value: "moreThanOneYear", label: "Used for more than one year before diagnosis" },
          { value: "withinOneYear", label: "First used within one year of diagnosis" },
          { value: "unsure", label: "Unsure" },
          { value: "unknown", label: "Unknown" }
        ]},
        { id: "roundupStopDate", label: "Approximately when did you stop using Roundup?", type: "date" },
        { id: "lastUseBeforeDiagnosis", label: "How long before your diagnosis did you last use Roundup?", type: "select", options: [
          { value: "", label: "Select option" },
          { value: "within20Years", label: "Used Roundup within 20 years of initial diagnosis" },
          { value: "over20Years", label: "Last used Roundup over 20 years before diagnosis" },
          { value: "unsure", label: "Unsure" },
          { value: "unknown", label: "Unknown" }
        ]},
        { id: "exposureType", label: "What type of exposure did you experience with Roundup?", type: "select", options: [
          { value: "", label: "Select option" },
          { value: "direct", label: "Direct contact (e.g., personally applied the product)" },
          { value: "indirect", label: "Indirect contact (e.g., present when others applied the product)" },
          { value: "unknown", label: "Unknown" }
        ]}
      ]
    }
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onNextStep(formData)
    }
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else {
      onPrevStep()
    }
  }

  const renderField = (field: { id: string; label: string; type: string; options?: { value: string; label: string }[]; condition?: (data: any) => boolean }) => {
    if (field.condition && !field.condition(formData)) {
      return null
    }

    switch (field.type) {
      case "select":
        return (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <select
              id={field.id}
              value={formData[field.id as keyof typeof formData]}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        )
      case "textarea":
        return (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <textarea
              id={field.id}
              value={formData[field.id as keyof typeof formData]}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows={3}
              required
            ></textarea>
          </div>
        )
      default:
        return (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              value={formData[field.id as keyof typeof formData]}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Qualification</h2>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">{slides[currentSlide].title}</h3>
        <div className="space-y-4">
          {slides[currentSlide].fields.map(renderField)}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-300"
        >
          <ChevronLeft size={20} className="inline mr-2" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-[#00263e] text-white rounded hover:bg-[#da291c] transition duration-300"
        >
          {currentSlide === slides.length - 1 ? 'Next' : 'Continue'}
          <ChevronRight size={20} className="inline ml-2" />
        </button>
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

// MedicalVerification component
const MedicalVerification: React.FC<StepProps> = ({ onNextStep, onPrevStep }) => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNextStep({ file })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Medical Verification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="medical-document" className="block text-sm font-medium text-gray-700 mb-2">
            Upload Medical Document
          </label>
          <input
            type="file"
            id="medical-document"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onPrevStep}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-300"
          >
            <ChevronLeft size={20} className="inline mr-2" />
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#00263e] text-white rounded hover:bg-[#da291c] transition duration-300"
          >
            Submit
            <ChevronRight size={20} className="inline ml-2" />
          </button>
        </div>
      </form>
    </div>
  )
}

export { OpeningAgreements, PersonalInformation, Qualification, MedicalVerification }