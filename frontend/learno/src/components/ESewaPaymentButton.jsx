import React from 'react';
import { API_URL } from '../config/config';
import axios from 'axios';

const EsewaPaymentButton = ({ amount, productName, onSuccess, onFailure }) => {
  const initiatePayment = async () => {
    try {
      // Call your Spring Boot backend to prepare payment
      const response = await fetch(`${API_URL}/payment/initiate/1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          productName: productName,
          userId: 1,
        }),
      });
      
      const data = await response.json();

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

      // 3. Add all required parameters as hidden inputs
      const addField = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      };

      // Required fields
      addField('amount', data.payment_params.amount);
      addField('tax_amount', data.payment_params.tax_amount);
      addField('total_amount', data.payment_params.total_amount);
      addField('transaction_uuid', data.transaction.transactionUuid);
      addField('product_code', data.payment_params.product_code);
      addField('product_service_charge', data.payment_params.product_service_charge);
      addField('product_delivery_charge', data.payment_params.product_delivery_charge);
      addField('success_url', 'https://esewa.com.np');
      addField('failure_url', data.payment_params.failure_url.trim());
      addField('signed_field_names', data.payment_params.signed_field_names);
      addField('signature', data.payment_params.signature);

      document.body.appendChild(form);
      form.submit();
      
    } catch (error) {
      console.error('Payment initiation failed:', error);
      onFailure(error);
      window.location.href = `${window.location.origin}/payment/failure`;
    }
  };

  return (
    <button onClick={initiatePayment} className="esewa-payment-button">
      Pay with eSewa
    </button>
  );
};

export default EsewaPaymentButton;