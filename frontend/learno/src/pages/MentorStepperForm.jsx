import { FileOutlined, GroupOutlined, ProfileOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AdditionalInfo from '../components/Mentor/AdditionalInfo';
import ProfessionalInfo from '../components/Mentor/ProfessionalInfo';
import DocumentUpload from '../components/Mentor/DocumentUpload';
import logoImage from "../assets/images/learno_logo.png";
import backgroundImage from "../assets/images/auth_bg.png";
import { useSelector } from 'react-redux';
import { API_URL } from '../config/config';
import { jwtDecode } from 'jwt-decode';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const MentorStepperForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const [professionalInfo, setProfessionalInfo] = useState(null);
  const [documentUpload, setDocumentUpload] = useState(null);
  const navigate = useNavigate();
  const user =  useSelector((state) => state.user.user)
  const [stompClient, setStompClient] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [mentorId, setMentorId] = useState(null);
  const [userName, setUserName] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.email) {
            setUserEmail(decoded.email);
            setMentorId(decoded.userId);
            setUserName(decoded.name);
          }
        } catch (error) {
          console.error('Error decoding JWT:', error);
        }
      }  
    }, [token]);

    useEffect(() => {
        if (!token || !userEmail) return;
  
        const socket = new SockJS(`${API_URL}/ws`);
        const client = Stomp.over(socket);
        client.connect(
        { Authorization: `Bearer ${token}` },
        () => {
          setStompClient(client);
        },
        (error) => {
          console.error('WebSocket connection error:', error);
        }
      );
    
        return () => {
          if (client.connected) client.disconnect();
        };
      }, [token, userEmail]);

    const sendNotification = () => {
    if (stompClient && userEmail) {
      const request = {
        sender: userEmail,
        senderName: userName,
        senderId: mentorId,
        isRead: false,
        type: 'MENTOR_REQUEST',
      };
      stompClient.send(
        '/app/mentor-request',
        { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
        JSON.stringify(request)
      );
    }
  };


  const submitAdditionalInfo = (values) => {
    setAdditionalInfo(values);
    setCurrentStep(1);
  };

  const submitProfessionalInfo = (values) => {
    setProfessionalInfo({
      ...values,
      skills: values.skills || [], 
    });
    setCurrentStep(2);
  };

  const data = {
    additionalInfo,
    professionalInfo
  }


  const submitDocuments = (values) => {
    setDocumentUpload(values)
     const formValue = {
        ...additionalInfo,
        ...professionalInfo,
        skills: professionalInfo?.skills?.join(', '),
        ...values, 
        userId: user?.id,
        status: "pending",
        isAvailability: false
      };

    fetch(`${API_URL}/mentor/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      },
      body: JSON.stringify(formValue)
    })
    .then(res => res.json())
    .then(() => {
      sendNotification();
      navigate("/mentor/confirmation");
    })
    .catch(error => {
      console.log(error);
      });
    console.log(formValue);
  };

  const forms = [
    <AdditionalInfo onFinish={submitAdditionalInfo} initialValues={additionalInfo} />,
    <ProfessionalInfo onFinish={submitProfessionalInfo} initialValues={professionalInfo} />,
    <DocumentUpload onFinish={submitDocuments} initialValues={documentUpload} />
  ];

  const isStepDisabled = (step) => {
    if (step === 1) return additionalInfo === null;
    if (step === 2) return additionalInfo === null || professionalInfo === null;
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
