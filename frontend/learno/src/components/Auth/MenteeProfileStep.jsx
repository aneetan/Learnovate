import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { UploadOutlined, PictureOutlined, PhoneOutlined, UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import logoImage from '../../assets/images/learno_logo.png';
import backgroundImage from '../../assets/images/auth_bg.png';

const { Option } = Select;

const MenteeProfileStep = ({ onFinish, initialValues }) => {
  const [profile, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFinish = (values) => {
    const formData = { ...values, profile };
    if (onFinish) onFinish(formData);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#148FA8]/90 z-0"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-xl shadow-lg p-10">
        {/* Logo */}
        <div className="flex justify-center mb-0">
          <img src={logoImage} alt="Logo" className="h-44 object-contain" />
        </div>

        <Form
          onFinish={handleFinish}
          initialValues={initialValues}
          layout="vertical"
          className="space-y-10"
        >
          {/* Profile Upload Section */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-inner p-8">
            <div className="flex items-center gap-4 mb-6">
              <PictureOutlined className="text-3xl text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Upload Profile Picture</h3>
            </div>
            <p className="text-base text-gray-600 mb-6">Only JPG, JPEG, and PNG formats are allowed.</p>

            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 shadow-inner overflow-hidden">
                <img
                  src={
                    profilePreview ||
                    'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                  }
                  alt="Profile Preview"
                  className="object-cover w-full h-full"
                />
              </div>

              <label className="cursor-pointer w-full md:w-auto">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileChange}
                  className="hidden"
                />
                <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-5 py-3 rounded-lg text-base font-semibold border border-blue-300 hover:bg-blue-200 transition duration-200">
                  <UploadOutlined className="text-lg" /> Choose Profile Image
                </div>
              </label>
            </div>
          </div>

          {/* Other Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Form.Item
              label={<span className="font-semibold text-lg"><PhoneOutlined className="mr-1" /> Phone Number</span>}
              name="phoneNumber"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                { pattern: /^\d{10}$/, message: 'Phone number must be 10 digits' },
              ]}
            >
              <Input placeholder="Enter contact number" maxLength={10} size="large" />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold text-lg"><UserOutlined className="mr-1" /> Current Status</span>}
              name="currentStatus"
              rules={[{ required: true, message: 'Please select your status!' }]}
            >
              <Select placeholder="Select your status" size="large">
                <Option value="Student">Student</Option>
                <Option value="Job Seeker">Job Seeker</Option>
                <Option value="Early Professional">Early Professional</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold text-lg"><AppstoreOutlined className="mr-1" /> Interest Area</span>}
              name="interestArea"
              rules={[{ required: true, message: 'Please select your interest area!' }]}
            >
              <Select placeholder="Select your interest area" size="large">
                <Option value="Technology">Technology</Option>
                <Option value="Business">Business</Option>
                <Option value="Design">Design</Option>
                <Option value="Marketing">Marketing</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Submit Button */}
          <div className="w-full text-right">
            <Button
              type="primary"
              htmlType="submit"
              className="px-10 py-4 text-lg font-semibold rounded-md shadow hover:scale-105 hover:shadow-lg transition-all duration-200"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MenteeProfileStep;
