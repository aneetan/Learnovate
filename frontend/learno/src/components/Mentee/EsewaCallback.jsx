import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { API_URL } from '../../config/config';

const EsewaCallback = () => {
  const[searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    const verifyPayment = async () => {
      // Get transaction ID from URL
      const transactionUuid  = searchParams.get('transaction_uuid');

      if (!transactionUuid ) {
        setStatus('error');
        setMessage('Invalid transaction ID');
        return;
      }

      try {
        // Step 1: Verify payment with backend
        const response = await axios.get(
          `${API_URL}/payment/verify`,
          { params: { transaction_uuid: transactionUuid } }
        );
        
        console.log('Verification response:', response.data);

       if (response.data.verified) {
          // 2. Update payment status in backend
          await axios.put(
            `${import.meta.env.VITE_API_URL}/payment/update-status`,
            { transactionId: transactionUuid, status: 'COMPLETED' }
          );

          setStatus('success');
          setMessage('Payment successful! Redirecting to dashboard...');
          
          // 3. Redirect after 3 seconds
          setTimeout(() => navigate('/mentee/dashboard'), 3000);
        } else {
          setStatus('error');
          setMessage('Payment verification failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage(error.response?.data?.message || 'Payment verification error');
      }
    };

    verifyPayment();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
        {status === 'success' ? (
          <div className="text-green-600">
            <CheckCircleIcon className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>
          </div>
        ) : status === 'error' ? (
          <div className="text-red-600">
            <XCircleIcon className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Payment Failed</h2>
          </div>
        ) : (
          <div className="text-blue-600">
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Processing Payment</h2>
          </div>
        )}
        
        <p className="text-gray-600 mb-6">{message}</p>
        
        {status === 'error' && (
          <button
            onClick={() => navigate('/checkout')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default EsewaCallback;