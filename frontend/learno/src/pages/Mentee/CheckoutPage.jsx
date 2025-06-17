import React from 'react';
import EsewaPayment from '../../components/Mentee/EsewaPayment';
import EsewaPaymentButton from '../../components/ESewaPaymentButton';

const CheckoutPage = () => {
  // These values would typically come from your app's state or props
  const amount = 1500; // The amount to charge
  const userId = 1;  // Current user's ID
  const mentorId = 1; // Selected mentor's ID

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Complete Your Payment</h1>
      
      <div className="max-w-lg mx-auto">
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
          {/* Your booking details would go here */}
        </div>
        
        {/* <EsewaPayment
          amount={amount}
          userId={userId}
          mentorId={mentorId}
        /> */}

        <EsewaPaymentButton
              amount={1000} 
              productName="Sample Product" 
              onSuccess={() => console.log('Success callback')}
              onFailure={() => console.log('Failure callback')}
            />
      </div>
    </div>
  );
};

export default CheckoutPage;