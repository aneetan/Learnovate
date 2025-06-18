import React, { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { API_URL, getUserId } from "../config/config";
import { useParams } from "react-router-dom";

const ESewaPaymentButton = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let params = useParams();

  // Generate a unique transaction UUID
  const generateTransactionUUID = () => {
    return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Handle form submission
  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const transaction_uuid = generateTransactionUUID();
      const total_amount = parseFloat(amount).toFixed(2);
      const product_code = import.meta.env.VITE_ESEWA_PRODUCT_CODE;
      const success_url = "http://localhost:5173/payment-success";
      const failure_url = import.meta.env.VITE_FAILURE_URL;

      const secret_key = import.meta.env.VITE_ESEWA_SECRET_KEY; 
      const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
      const signature = CryptoJS.HmacSHA256(message, secret_key).toString(
        CryptoJS.enc.Base64
      );

      const initiationDto = {
        userId:  getUserId(localStorage.getItem("token")),
        transactionUuid: transaction_uuid,
        amount:  parseFloat(total_amount).toFixed(2),
        signature: signature,
      };

      const response = await fetch(`${API_URL}/payment/initiate?mentorId=${params.mentorId}&bookingId=${params.bookingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initiationDto)
      });

      const data = await response.json();

      if (data.transactionUuid) {
      // Prepare form data for eSewa
        const formData = {
          amount: total_amount,
          tax_amount: 0,
          total_amount: total_amount,
          transaction_uuid,
          product_code,
          product_service_charge: 0,
          product_delivery_charge: 0,
          success_url,
          failure_url,
          signed_field_names: "total_amount,transaction_uuid,product_code",
          signature,
        };

        // Create a form dynamically and submit it to eSewa
        const form = document.createElement("form");
        form.method = "POST";
        form.action = import.meta.env.VITE_ESEWA_GATEWAY_URL;

        Object.entries(formData).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    } else {
        throw new Error("Failed to initiate payment on backend");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h1>eSewa Payment Integration</h1>
      <form onSubmit={handlePayment} className="payment-form">
        <div className="form-group">
          <label htmlFor="amount">Amount (NPR):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Enter amount"
            min="1"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Pay with eSewa"}
        </button>
      </form>
    </div>
  );
};

export default ESewaPaymentButton;