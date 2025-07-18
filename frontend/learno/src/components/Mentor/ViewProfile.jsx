import React from 'react';
import { UserOutlined, MailOutlined, PhoneOutlined, BulbOutlined, AppstoreOutlined } from '@ant-design/icons';
import { FiEdit2 } from 'react-icons/fi';

const ViewProfile = ({ profile, handleEdit }) => {
  const renderField = (label, value, icon, isPrice = false) => (
    <div className="flex flex-col gap-2 w-full border-b border-gray-200 py-4 last:border-b-0">
      <label className="text-sm font-semibold text-gray-600 flex items-center">
        {React.cloneElement(icon, { className: 'w-5 h-5 text-[#26A69A] mr-2' })}
        {label}
      </label>
      <p className="text-base text-gray-900 font-medium">
        {isPrice ? `Nrs. ${value}` : value || '-'}
      </p>
    </div>
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile Details</h2>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleEdit}
            className="flex items-center px-5 py-2.5 bg-[#26A69A] text-white rounded-lg shadow-md hover:bg-[#208f84] hover:scale-105 transition duration-300 text-sm font-semibold"
          >
            <FiEdit2 className="mr-2 w-5 h-5" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {renderField('Name', profile?.user?.name, <UserOutlined />)}
        {renderField('Email', profile?.user?.email, <MailOutlined />)}
        {renderField('Phone Number', profile?.phoneNumber, <PhoneOutlined />)}
        {renderField('Bio', profile?.bio, <BulbOutlined />)}
        {renderField('Session Price (Nrs.)', profile?.price, <BulbOutlined />, true)}
        {renderField('Area of Expertise', profile?.area, <AppstoreOutlined />)}
        {renderField('Professional Title', profile?.title, <BulbOutlined />)}
        {renderField('Years of Experience', profile?.experience, <BulbOutlined />)}
      </div>
    </>
  );
};

export default ViewProfile;