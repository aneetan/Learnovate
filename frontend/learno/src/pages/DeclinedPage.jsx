import React from 'react'
import { FaTimesCircle, FaPaperclip, FaEnvelope } from 'react-icons/fa'

const DeclinedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <FaTimesCircle className='w-8 h-8 text-red-600'/>
          </div>
        </div>
        
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Request Declined
        </h1>
        
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          Your mentor request has been declined. Please submit verification documents to proceed.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <div className="flex items-start space-x-3">
            <FaEnvelope className="flex-shrink-0 mt-1 text-blue-500" />
            <div>
              <p className="text-sm text-[var(--primary-color)]">
                Email your documents to <span className="font-semibold">verification@learnovate.com</span> with subject: <span className="font-mono">"Verification Request - [Your name]"</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={() => window.location.href = 'mailto:verification@learnovate.com?subject=Verification Documents'}
            className="flex-1 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <FaEnvelope />
            <span>Send email</span>
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-50"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeclinedPage