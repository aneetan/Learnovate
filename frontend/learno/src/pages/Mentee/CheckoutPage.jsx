import React from 'react';
import ESewaPaymentButton from '../../components/ESewaPaymentButton';

const CheckoutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Complete Your Payment</h1>
      
      <div className="max-w-lg mx-auto">
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <ESewaPaymentButton/>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;