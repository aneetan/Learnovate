import React from 'react';
import ESewaPaymentButton from '../../components/ESewaPaymentButton';

const CheckoutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">      
      <div className="max-w-lg mx-auto">
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md mt-24">
            <ESewaPaymentButton/>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;