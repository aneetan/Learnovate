import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../config/config';
import axios from 'axios';

const EsewaSuccess = () => {
  const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
      const transactionUuid = queryParams.get('transaction_uuid');

      console.log(transactionUuid)
  
  useEffect(() => {
    const verifyPayment = async () => {
        try {
          console.log(transactionUuid)
          const response = await axios.get(`${API_URL}/payment/success`, {
            params: {
              transaction_uuid: transactionUuid
            }
          });
          
          const result = await response.json();
          if (result.status === 200) {
            // Payment verified successfully
            console.log('Payment verified:', result);
          } else {
            console.error('Payment verification failed:', result.message);
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
        }
    };
    
    verifyPayment();
  }, [location]);

  return (
    <div className="payment-success">
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase.</p>
    </div>
  );
};

export default EsewaSuccess;