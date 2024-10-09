import React, { useState } from 'react'

interface RetainerAgreementProps {
  onComplete: () => void
}

const RetainerAgreement: React.FC<RetainerAgreementProps> = ({ onComplete }) => {
  const [signature, setSignature] = useState('')
  const [isSigned, setIsSigned] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (signature.trim()) {
      setIsSigned(true)
      onComplete()
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Retainer Agreement</h2>
      {!isSigned ? (
        <>
          <p className="text-lg font-semibold">Based on your case, your co-counsel partner will be Kline Specter, P.C., LLC.</p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Retainer Agreement</h3>
            <p className="mb-2">This is a sample retainer agreement. In a real application, this would be a full legal document.</p>
            <p className="mb-2">1. The client agrees to retain the services of Kline Specter, P.C., LLC.</p>
            <p className="mb-2">2. The law firm agrees to provide legal representation in the matter of the client's case.</p>
            <p className="mb-2">3. The client agrees to pay fees as outlined in this agreement.</p>
            <p>4. This agreement is subject to the terms and conditions stated herein.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-2">
                Please sign here to agree to the terms:
              </label>
              <input
                type="text"
                id="signature"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Type your full name"
                required
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className={`w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${!signature.trim() && 'opacity-50 cursor-not-allowed'}`}
                disabled={!signature.trim()}
              >
                Submit Retainer Agreement
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold text-green-600 mb-4">Retainer Agreement Signed</p>
          <p className="text-lg text-yellow-600">Your case is now under review.</p>
        </div>
      )}
    </div>
  )
}

export default RetainerAgreement