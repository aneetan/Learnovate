import React, { useState } from 'react';
import { Button, Form, message, Spin } from 'antd';
import { UploadOutlined, FileTextOutlined, PictureOutlined } from '@ant-design/icons';

const DocumentUpload = ({ onFinish, initialValues }) => {
  const [profile, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.match('image.*')) {
      message.error("Please upload an image file (jpeg, png)");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      message.error('File size should be less than 2MB');
      return;
    }
    setProfile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      message.error('File size should be less than 5MB');
      return;
    }
    setDocument(file);
  };

  const uploadToCloudinary = async (file, type = "image") => {
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
    const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const url = `https://api.cloudinary.com/v1_1/${cloudname}/${type}/upload`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      message.error('Upload failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!profile || !document) {
      message.error('Please upload both profile picture and document');
      return;
    }

    setLoading(true);
    try {
      let uploadedProfileUrl = null;
      let uploadedDocUrl = null;

      // Upload profile picture
      if (profile) {
        uploadedProfileUrl = await uploadToCloudinary(profile, "image");
      }

      // Upload document
      if (document) {
        uploadedDocUrl = await uploadToCloudinary(document, "image");
      }

      // Call the onFinish handler with the uploaded URLs
      onFinish({
        profileUrl: uploadedProfileUrl,
        documentUrl: uploadedDocUrl,
      });
      message.success('Files uploaded successfully!');
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} tip="Uploading files...">
      <Form onFinish={handleSubmit} initialValues={initialValues}>
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
                name="profile"
                onChange={handleProfileChange}
                className="hidden"
                required
                disabled={loading}
              />
              <div className={`inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-300 hover:bg-blue-200 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
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
          <p className="text-sm text-gray-500 mb-4">Click photo of any verifiable document and upload here.</p>

          <label className="cursor-pointer block w-full">
            <input
              type="file"
              accept="image/*"
              name="document"
              onChange={handleDocumentChange}
              className="hidden"
              required
              disabled={loading}
            />
            <div className={`inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium border border-green-300 hover:bg-green-200 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <UploadOutlined /> Choose Documents
            </div>
          </label>

          {document && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-sm font-medium text-green-700 mb-2">Selected Files:</p>
              <p className="text-sm text-green-800">{document.name}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full text-right px-4">
          <Button
            type="primary"
            htmlType="submit"
            className="px-6 py-2 font-semibold rounded-md shadow hover:scale-105 hover:shadow-lg transition-all duration-200"
            disabled={loading}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Spin>
  );
};

export default DocumentUpload;