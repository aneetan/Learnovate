import { useState } from "react";
import RegisterStep from "../components/Auth/RegisterStep";
import SelectRoleStep from "../components/Auth/SelectRoleStep";

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleStepComplete = () => {
    setCurrentStep(2);
  };

  const handleSubmit = (responseData) => {
    // Handle successful registration 
    // You might want to redirect, show a success message, etc.
    console.log('Registration completed', responseData);
  };

  return (
    <div className="mx-auto p-0 bg-white rounded-lg shadow-md">
      {currentStep === 1 && (
        <RegisterStep 
          formData={formData} 
          handleChange={handleChange}
          onStepComplete={handleStepComplete}
        />
      )}
      {currentStep === 2 && (
        <SelectRoleStep
          formData={formData} 
          handleChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default RegistrationForm;