import React, { useState } from 'react';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined, PictureOutlined, PhoneOutlined, UserOutlined, AppstoreOutlined } from '@ant-design/icons';

const { Option } = Select;

const MenteeProfileStep = ({ onFinish, initialValues }) => {
  const [profile, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(initialValues?.profilePreview || null);

  const handleProfileChange = (info) => {
    const file = info.file.originFileObj;
    setProfile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG files!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <Form onFinish={onFinish} initialValues={initialValues} layout="vertical">
        {/* Profile Upload Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-28 h-28 rounded-full border-2 border-dashed border-gray-300 shadow-inner overflow-hidden">
            <img
              src={profilePreview || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
              alt="Profile Preview"
              className="object-cover w-full h-full"
            />
          </div>
          <Upload
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleProfileChange}
            accept="image/jpeg,image/png"
          >
            <Button icon={<UploadOutlined />} className="bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200">
              Upload Profile Image
            </Button>
          </Upload>
        </div>

        {/* Form Fields */}
        <Form.Item
          label={<span className="font-medium"><PhoneOutlined /> Phone Number</span>}
          name="phoneNumber"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            { pattern: /^\d{10}$/, message: 'Phone number must be 10 digits' },
          ]}
        >
          <Input placeholder="Enter contact number" maxLength={10} />
        </Form.Item>

        <Form.Item
          label={<span className="font-medium"><UserOutlined /> Current Status</span>}
          name="currentStatus"
          rules={[{ required: true, message: 'Please select your status!' }]}
        >
          <Select placeholder="Select your status">
            <Option value="Student">Student</Option>
            <Option value="Job Seeker">Job Seeker</Option>
            <Option value="Early Professional">Early Professional</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={<span className="font-medium"><AppstoreOutlined /> Interest Area</span>}
          name="interestArea"
          rules={[{ required: true, message: 'Please select your interest area!' }]}
        >
          <Select placeholder="Select your interest area">
            <Option value="Technology">Technology</Option>
            <Option value="Business">Business</Option>
            <Option value="Design">Design</Option>
            <Option value="Marketing">Marketing</Option>
          </Select>
        </Form.Item>

        {/* Submit Button */}
        <div className="w-full text-right mt-6">
          <Button type="primary" htmlType="submit" className="px-6 py-2 font-semibold rounded-md shadow hover:scale-105 hover:shadow-lg transition-all duration-200">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default MenteeProfileStep;
