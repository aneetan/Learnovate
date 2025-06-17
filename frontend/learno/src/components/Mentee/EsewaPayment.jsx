import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/config';

const EsewaPayment = ({ amount, userId, mentorId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const successUrl = `${window.location.origin}/payment/success`;
      const failureUrl = `${window.location.origin}/payment/failure`;

      const params = new URLSearchParams();
      params.append('amount', parseFloat(amount));
      params.append('userId', userId);
      params.append('productName', 'Mentorship Session');
      params.append('callbackUrl', successUrl);

      // Call backend API
      const response = await axios.post(`${API_URL}/payment/initiate/${mentorId}`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('Payment initiated response:', response.data);

      // Verify response data
      if (!response.data?.esewa_url || !response.data?.payment_params) {
        throw new Error('Invalid response from server');
      }

      const { esewa_url, payment_params } = response.data;

      // Verify required parameters
      const requiredParams = [
        'amount', 'tax_amount', 'total_amount', 'transaction_uuid',
        'product_code', 'signature', 'signed_field_names',
      ];
      requiredParams.forEach(param => {
        if (!payment_params[param]) {
          throw new Error(`Missing required parameter: ${param}`);
        }
      });

      // Create and submit form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = esewa_url;

      Object.entries(payment_params).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value).trim(); // Ensure no extra spaces
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    } catch (err) {
      console.error('Payment error:', err);
      setError('Failed to initiate payment. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Pay with eSewa</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <p className="text-gray-700">
          <span className="font-semibold">Amount:</span> NPR {amount}
        </p>
      </div>
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-md text-white font-medium
          ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
          transition-colors duration-200`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : 'Pay with eSewa'}
      </button>
      <div className="mt-4 flex justify-center">
        <img
          src="https://www.esewa.com.np/assets/images/np_esewa_rgb.png"
          alt="eSewa Logo"
          className="h-10"
        />
      </div>
    </div>
  );
};

export default EsewaPayment;