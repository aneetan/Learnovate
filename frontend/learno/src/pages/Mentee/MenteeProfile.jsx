import React, { useState, useRef, useEffect } from 'react';
import { FiEdit2, FiCamera, FiUser, FiSave, FiX, FiTrash2 } from 'react-icons/fi';
import { PhoneOutlined, UserOutlined, AppstoreOutlined, MailOutlined } from '@ant-design/icons';

const MenteeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    currentStatus: 'Student',
    area: 'Technology',
    profileUrl: null,
  });
  const [editedProfile, setEditedProfile] = useState(profile);
  const [profilePreview, setProfilePreview] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch dummy data from JSONPlaceholder
  useEffect(() => {
    const fetchDummyData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!response.ok) throw new Error('Failed to fetch dummy data');
        const data = await response.json();
        const dummyProfile = {
          name: data.name || 'John Doe',
          email: data.email || 'john.doe@example.com',
          phone: data.phone?.replace(/\D/g, '').slice(0, 10) || '1234567890',
          currentStatus: 'Student',
          area: 'Technology',
          profileUrl: null,
        };
        setProfile(dummyProfile);
        setEditedProfile(dummyProfile);
      } catch (error) {
        console.error('Error fetching dummy data:', error);
        setFetchError('Failed to load profile data. Using default values.');
      }
    };
    fetchDummyData();
  }, []);

  const handleEdit = () => {
    setEditedProfile(profile);
    setProfilePreview(profile.profileUrl);
    setIsEditing(true);
  };

  const handleSave = async () => {
    let updatedProfile = { ...editedProfile };

    if (editedProfile.profileFile) {
      try {
        const uploadedUrl = await uploadToCloudinary(editedProfile.profileFile);
        updatedProfile.profileUrl = uploadedUrl;
      } catch (error) {
        console.error('Upload failed', error);
        setFetchError('Failed to upload profile picture');
        return;
      }
    }

    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setProfilePreview(profile.profileUrl);
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    console.log('Delete account initiated for user:', profile.email);
    // Placeholder for API call to delete account
    // Example: await fetch(`${API_URL}/user/delete`, { method: 'DELETE', headers: { ... } });
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedProfile((prev) => ({
        ...prev,
        profileFile: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file, type = 'image') => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
    const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const url = `https://api.cloudinary.com/v1_1/${cloudname}/${type}/upload`;

    const response = await fetch(url, {
      method: 'POST',
      body: data,
    });

    const result = await response.json();
    return result.secure_url;
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const renderInput = (label, name, value, icon, isSelect = false, options = []) => (
    <div className="flex flex-col gap-2 w-full border-b border-gray-200 py-4 last:border-b-0 transition-opacity duration-300">
      <label className="text-sm font-semibold text-gray-600 flex items-center">
        {React.cloneElement(icon, { className: 'w-5 h-5 text-[#26A69A] mr-2' })}
        {label}
      </label>
      {isEditing ? (
        isSelect ? (
          <select
            name={name}
            value={value || ''}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#26A69A]/50 transition duration-300"
          >
            <option value="" disabled>
              Select {label.toLowerCase()}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'}
            name={name}
            value={value || ''}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#26A69A]/50 transition duration-300"
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        )
      ) : (
        <p className="text-base text-gray-900 font-medium">{value || '-'}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-2xl transition-opacity duration-500">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#26A69A] to-[#148FA8] h-40 sm:h-48 relative rounded-t-lg shadow-sm">
          <div className="absolute bottom-[-4rem] left-4 sm:left-8">
            <div className="relative group transform hover:scale-105 transition duration-300">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-lg">
                {profilePreview || editedProfile.profileUrl ? (
                  <img
                    src={profilePreview || editedProfile.profileUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <FiUser className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400" />
                  </div>
                )}
              </div>
              {isEditing && (
                <>
                  <button
                    onClick={triggerFileInput}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
                  >
                    <FiCamera className="text-white w-8 h-8 sm:w-10 sm:h-10" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleProfilePictureChange}
                    accept="image/*"
                    className="hidden"
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-24 sm:pt-28 px-4 sm:px-6 pb-10 space-y-6">
          {/* Header and Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile Details</h2>
            <div className="flex gap-3 flex-wrap">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center px-5 py-2.5 bg-[#26A69A] text-white rounded-lg shadow-md hover:bg-[#208f84] hover:scale-105 transition duration-300 text-sm font-semibold"
                >
                  <FiEdit2 className="mr-2 w-5 h-5" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-5 py-2.5 bg-[#26A69A] text-white rounded-lg shadow-md hover:bg-[#208f84] hover:scale-105 transition duration-300 text-sm font-semibold"
                  >
                    <FiSave className="mr-2 w-5 h-5" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-5 py-2.5 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 hover:scale-105 transition duration-300 text-sm font-semibold"
                  >
                    <FiX className="mr-2 w-5 h-5" />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Fetch Error Message */}
          {fetchError && <p className="text-red-500 text-sm">{fetchError}</p>}

          {/* Form Fields */}
          <div className="flex flex-col gap-2">
            {renderInput('Name', 'name', editedProfile.name, <UserOutlined />)}
            {renderInput('Email', 'email', editedProfile.email, <MailOutlined />)}
            {renderInput('Phone Number', 'phone', editedProfile.phone, <PhoneOutlined />)}
            {renderInput(
              'Current Status',
              'currentStatus',
              editedProfile.currentStatus,
              <UserOutlined />,
              true,
              ['Student', 'Job Seeker', 'Early Professional']
            )}
            {renderInput(
              'Interest Area',
              'area',
              editedProfile.area,
              <AppstoreOutlined />,
              true,
              ['Technology', 'Business', 'Design', 'Marketing']
            )}
          </div>

          {/* Delete Account Card */}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="max-w-xs">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Delete Account</h4>
                <p className="text-sm text-gray-600">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="flex items-center px-5 py-2.5 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition duration-300 text-sm font-semibold w-full sm:w-auto justify-center sm:justify-start"
              >
                <FiTrash2 className="mr-2 w-5 h-5" />
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showModal && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={cancelDelete}
          >
            <div
              className="bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Account Deletion</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-sm hover:bg-gray-600 hover:scale-105 transition duration-300 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 hover:scale-105 transition duration-300 text-sm font-semibold"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenteeProfile;