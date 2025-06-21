import React, { useEffect, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { API_URL, getUserId } from "../config/config";
import { useParams } from "react-router-dom";

const ESewaPaymentButton = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mentorData, setMentorData] = useState(null);
   const [error, setError] = useState(null);
  let params = useParams();

  // Fetch mentor data including session price
  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await axios.get(`${API_URL}/mentee/getMentors/${params.mentorId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        setMentorData(response.data);
        setAmount(response.data.price); 
      } catch (err) {
        setError("Failed to fetch mentor price");
        console.error("Error fetching mentor data:", err);
      }
    };

    fetchMentorData();
  }, [params.mentorId]);

  // Generate a unique transaction UUID
  const generateTransactionUUID = () => {
    return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Handle form submission
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!mentorData) return;
    setIsLoading(true);

    try {
      const transaction_uuid = generateTransactionUUID();
      const total_amount = parseFloat(amount).toFixed(2);
      const product_code = import.meta.env.VITE_ESEWA_PRODUCT_CODE;
      const success_url = "http://localhost:5173/mentee/dashboard";
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

   if (error) {
    return <div className="payment-container error">{error}</div>;
  }

   if (!mentorData) {
    return <div className="payment-container">Loading mentor details...</div>;
  }

  return (
    <>
  <h1 className="text-xl font-semibold text-center text-gray-800 mb-6">Payment Details</h1>
  
  <div className="space-y-4 mb-8">
    <div className="flex justify-between py-3 border-b border-gray-100">
      <span className="font-medium text-gray-600">Mentor:</span>
      <span className="text-gray-800">{mentorData.user.name}</span>
    </div>
    <div className="flex justify-between py-3">
      <span className="font-medium text-gray-600">Session Price:</span>
      <span className="text-gray-800">NPR {mentorData.price}</span>
    </div>
  </div>
  
  <form onSubmit={handlePayment}>
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
        isLoading 
          ? 'bg-[var(--primary-color)] cursor-not-allowed' 
          : 'bg-[var(--primary-color)] hover:bg-[var(--primary-dark)]'
      }`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        `Pay NPR ${mentorData.price} with eSewa`
      )}
    </button>
  </form>
</>
  );
};

export default ESewaPaymentButton;