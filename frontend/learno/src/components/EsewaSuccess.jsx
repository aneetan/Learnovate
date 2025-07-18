import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const EsewaSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState("Verifying your payment...");
  const [successData, setSuccessData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const encodedData = queryParams.get("data");
        
        if (!encodedData) {
          throw new Error("No payment data received from eSewa");
        }

        const decodedJson = atob(encodedData); 
        const esewaResponse = JSON.parse(decodedJson);
        const transactionUuid = esewaResponse.transaction_uuid;
         
        if (!transactionUuid) {
          throw new Error("No transaction UUID found in callback");
        }

        const verificationDto = {
          transactionUuid: transactionUuid,
          status: "SUCCESS",
        };

        const response = await fetch(`${API_URL}/payment/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("token")}` 
          },
          body: JSON.stringify(verificationDto)
        });

        if (!response.ok) {
          throw new Error("Payment verification failed");
        }

        const data = await response.json();
        
        setPaymentStatus("Payment Verified Successfully!");
        setSuccessData(data); 
        setIsLoading(false);
        
      } catch (error) {
        setPaymentStatus("Payment verification failed");
        setError(error.message);
        setIsLoading(false);
        console.error("Payment verification error:", error);
      }
    };

    verifyPayment();
  }, [location]);

  const handleGoToDashboard = () => {
    navigate("/mentee/dashboard");
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto my-10 p-6 rounded-lg shadow-md bg-white text-center">
        <div className="flex justify-center">
          <ArrowPathIcon className="h-12 w-12 text-blue-500 animate-spin" />
        </div>
        </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 rounded-lg shadow-md bg-green-50 border border-green-200">
      <div className="flex justify-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500" />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-center text-green-600">Booking Confirmed!</h1>
      <p className="mt-2 text-lg text-center text-gray-700"> Payment Successful</p>

      <button 
        onClick={handleGoToDashboard}
        className="mt-8 w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default EsewaSuccess;