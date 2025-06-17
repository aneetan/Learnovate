import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EsewaSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState("Verifying...");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const encodedData = queryParams.get("data");
         if (!encodedData) {
          throw new Error("No payment data received from eSewa");
        }

        //  const decodedData = decodeURIComponent(encodedData);
         const decodedJson = atob(encodedData); 
        const esewaResponse = JSON.parse(decodedJson);

        // 3. Extract required fields
        const transactionUuid = esewaResponse.transaction_uuid;
         
        if (!transactionUuid) {
          throw new Error("No transaction UUID found in callback");
        }

        const verificationDto = {
          transactionUuid: transactionUuid,
          status: "SUCCESS",
        };

        const response = await fetch(`http://localhost:8080/api/payment/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(verificationDto)
          });

         if (response.data && response.data.status === "COMPLETED") {
          setPaymentStatus("Payment verified successfully!");
          setPaymentDetails(response.data);
        } else {
          setPaymentStatus(`Payment status: ${response.data?.status || "UNKNOWN"}`);
        }

      } catch (error) {
        setPaymentStatus("Payment verification failed.");
        console.error(error);
      }
    };

    verifyPayment();
  }, [location]);

  return (
    <div className="container">
      <h1>Payment Status</h1>
      <p>{paymentStatus}</p>
      <a href="/">Go to Home</a>
    </div>
  );
};

export default EsewaSuccess;