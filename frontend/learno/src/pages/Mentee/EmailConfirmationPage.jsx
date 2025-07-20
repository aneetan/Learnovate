import React from 'react'
import { FaCheck, FaCheckCircle } from 'react-icons/fa'

const EmailConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheck className='w-8 h-8 text-green-600'/>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Request Submitted Successfully!
        </h1>
        
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Your request has been sent to admin. Please wait for confirmation email.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-[var(--primary-color)]">
            <strong>What's next?</strong><br />
            You'll receive a confirmation email within 24-48 hours. Please check your inbox and spam folder.
          </p>
        </div>
        
        <button 
          onClick={() => window.location.href = '/'}
          className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Return to Home
        </button>
      </div>
    </div>
  )
}

export default EmailConfirmationPage
