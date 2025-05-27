import { FileOutlined, GroupOutlined, ProfileOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import React, { useState } from 'react';
import AdditionalInfo from '../components/Mentor/AdditionalInfo';
import ProfessionalInfo from '../components/Mentor/ProfessionalInfo';
import DocumentUpload from '../components/Mentor/DocumentUpload';
import logoImage from "../assets/images/learno_logo.png";
import backgroundImage from "../assets/images/auth_bg.png";

const MentorStepperForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [additonalInfo, setAdditionalInfo] = useState(null);
  const [professionalInfo, setProfessionalInfo] = useState(null);
  const [documentUpload, setDocumentUpload] = useState(null);

  const submitAdditionalInfo = (values) => {
    setAdditionalInfo(values);
    setCurrentStep(1);
  };

  const submitProfessionalInfo = (values) => {
    setProfessionalInfo(values);
    setCurrentStep(2);
  };

  const data = {
    additonalInfo,
    professionalInfo
  };

  const submitDocuments = () => {
    const formValue = {
      ...data,
      status: "pending"
    };
    console.log(formValue);
  };

  const forms = [
    <AdditionalInfo onFinish={submitAdditionalInfo} initialValues={additonalInfo} />,
    <ProfessionalInfo onFinish={submitProfessionalInfo} initialValues={professionalInfo} />,
    <DocumentUpload onFinish={submitDocuments} initialValues={documentUpload} />
  ];

  const isStepDisabled = (step) => {
    if (step === 1) return additonalInfo === null;
    if (step === 2) return additonalInfo === null || professionalInfo === null;
    return false;
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#148FA8]/90 z-0" ></div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-xl shadow-xl p-6">
        {/* Logo */}
        <div className="flex justify-center mb-4 -mt-6">
          <img src={logoImage} alt="Logo" className="h-32 object-contain" />
        </div>

        {/* Steps */}
        <div className="mb-6 px-4">
          <Steps current={currentStep} onChange={setCurrentStep} responsive>
            <Steps.Step title="Personal Details" icon={<ProfileOutlined />} disabled={isStepDisabled(0)} />
            <Steps.Step title="Professional Info" icon={<GroupOutlined />} disabled={isStepDisabled(1)} />
            <Steps.Step title="Documents" icon={<FileOutlined />} disabled={isStepDisabled(2)} />
          </Steps>
        </div>

        {/* Form content */}
        <div className="px-2">{forms[currentStep]}</div>
      </div>
    </div>
  );
};

export default MentorStepperForm;
