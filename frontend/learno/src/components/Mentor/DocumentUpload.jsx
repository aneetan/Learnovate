import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { UploadOutlined, FileTextOutlined, PictureOutlined } from '@ant-design/icons';

const DocumentUpload = ({ onFinish, initialValues }) => {
  const [profile, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [documents, setDocuments] = useState([]);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentsChange = (e) => {
    setDocuments(Array.from(e.target.files));
  };

  return (
    <Form onFinish={onFinish} initialValues={initialValues}>
      {/* Profile Upload Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <PictureOutlined className="text-2xl text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800">Upload Profile Picture</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">Only JPG, JPEG and PNG formats are allowed.</p>

        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-28 h-28 rounded-full border-2 border-dashed border-gray-300 shadow-inner overflow-hidden">
            <img
              src={
                profilePreview ||
                "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
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
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-300 hover:bg-blue-200 transition duration-200">
              <UploadOutlined /> Choose Profile Image
            </div>
          </label>
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileTextOutlined className="text-2xl text-green-500" />
          <h3 className="text-lg font-semibold text-gray-800">Upload Verification Documents</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">Only PDF and Word documents are accepted.</p>

        <label className="cursor-pointer block w-full">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            multiple
            onChange={handleDocumentsChange}
            className="hidden"
          />
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium border border-green-300 hover:bg-green-200 transition duration-200">
            <UploadOutlined /> Choose Documents
          </div>
        </label>

        {documents.length > 0 && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-sm font-medium text-green-700 mb-2">Selected Files:</p>
            <ul className="list-disc list-inside text-sm text-green-800">
              {documents.map((doc, idx) => (
                <li key={idx}>{doc.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="w-full text-right px-4">
        <Button
          type="primary"
          htmlType="submit"
          className="px-6 py-2 font-semibold rounded-md shadow hover:scale-105 hover:shadow-lg transition-all duration-200"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default DocumentUpload;
