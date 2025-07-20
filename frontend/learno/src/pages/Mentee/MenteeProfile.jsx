import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MenteeViewProfile from '../../components/Mentee/MenteeProfileView';
import MenteeEditProfile from '../../components/Mentee/MenteeEditProfile';
import DeleteAccountModal from '../../components/Mentee/DeleteAccountModal';
import { API_URL } from '../../config/config';
import { FiCamera, FiUser } from 'react-icons/fi';

const MenteeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({});
  const [editedProfile, setEditedProfile] = useState({});
  const [profilePreview, setProfilePreview] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchMenteeData = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/getMentee/${user.id}`);
        const menteeData = response.data;

        const transformedProfile = {
          name: menteeData.user.name,
          email: menteeData.user.email,
          profileUrl: menteeData.profileUrl,
          phone: menteeData.phone,
          currentStatus: menteeData.currentStatus,
          area: menteeData.area,
          menteeId: menteeData.menteeId,
          userId: menteeData.user.userId
        };
        
        setProfile(transformedProfile);
        setEditedProfile(transformedProfile);
        setProfilePreview(menteeData.profileUrl);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };
    fetchMenteeData();
  }, [user.id]);

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

  const handleDeleteAccount = () => setShowModal(true);
  const confirmDelete = () => {
    console.log('Delete account initiated for user:', profile.email);
    setShowModal(false);
  };
  const cancelDelete = () => setShowModal(false);

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

  const triggerFileInput = () => fileInputRef.current.click();

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
        {isEditing ? (
          <MenteeEditProfile
            editedProfile={editedProfile}
            profilePreview={profilePreview}
            fileInputRef={fileInputRef}
            handleChange={handleChange}
            handleProfilePictureChange={handleProfilePictureChange}
            triggerFileInput={triggerFileInput}
            handleSave={handleSave}
            handleCancel={handleCancel}
            fetchError={fetchError}
          />
        ) : (
          <MenteeViewProfile
            profile={profile}
            onEdit={handleEdit}
            onDelete={handleDeleteAccount}
          />
        )}

        <DeleteAccountModal
          show={showModal}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
};

export default MenteeProfile;