import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new email page
    navigate("/forgot-password-email");
  }, [navigate]);

  return null;
};

export default ForgotPassword; 