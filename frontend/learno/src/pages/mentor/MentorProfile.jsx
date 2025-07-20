import React, { useState, useRef, useEffect } from 'react';
import { FiCamera, FiUser, FiSave, FiX, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { API_URL } from '../../config/config';
import { useSelector } from 'react-redux';
import axios from 'axios';
import EditProfile from '../../components/Mentor/EditProfile';
import ViewProfile from '../../components/Mentor/ViewProfile';
import DeleteConfirmationModal from '../../components/Mentor/DeleteProfileModal';
import DeleteAccount from '../../components/Mentor/DeleteProfile';

const MentorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/mentor/getMentor/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProfile(response.data);
        setEditedProfile(response.data);
        setProfilePreview(response.data?.profileUrl);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };
    fetchMentorData();
  }, [user.id]);

  const validateFields = () => {
    if (!editedProfile) return false;
    
    const newErrors = {};
    if (!editedProfile.bio) newErrors.bio = 'Please enter your bio';
    if (!editedProfile.phoneNumber) {
      newErrors.phoneNumber = 'Please enter contact number';
    } else if (!/^\d{10}$/.test(editedProfile.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit number';
    }
    if (!editedProfile.price) newErrors.sessionPrice = 'Please enter session price per hour';
    if (!editedProfile.area) newErrors.areaOfExpertise = 'Please select your area of expertise';
    if (!editedProfile.title) newErrors.professionalTitle = 'Please select your professional title';
    if (!editedProfile.experience) newErrors.yearsOfExperience = 'Please select your years of experience';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
    setProfilePreview(profile?.profileUrl);
    setErrors({});
  };

  const handleSave = async () => {
    if (!validateFields() || !editedProfile) return;

    try {
      let updatedProfile = { ...editedProfile };

      if (editedProfile.profileFile) {
        const uploadedUrl = await uploadToCloudinary(editedProfile.profileFile);
        updatedProfile.profileUrl = uploadedUrl;
      }

      updatedProfile.price = String(updatedProfile.price);

       try {
          await axios.put(`${API_URL}/mentor/updateProfile`, editedProfile,  {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
          });
          setProfile(editedProfile);
          setIsEditing(false);
        } catch (error) {
          setErrors({ save: 'Update failed' }, error);
        }
      


      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrors({ save: 'Failed to save profile. Please try again.' });
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setProfilePreview(profile?.profileUrl);
    setErrors({});
    setIsEditing(false);
  };

  const handleDeleteAccount = () => setShowModal(true);
  const confirmDelete = () => {
    console.log('Delete account initiated for user:', profile?.user?.email);
    // Add your delete account API call here
    setShowModal(false);
  };
  const cancelDelete = () => setShowModal(false);



  const handleChange = (e) => {
    const { name, value, type } = e.target;

  const processedValue = type === 'number' ? Number(value) : value;

    setEditedProfile(prev => ({
      ...(prev || {}),
      user: {
          ...prev.user,
          [name]: processedValue
        }

    }));

    

    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedProfile(prev => ({
        ...(prev || {}),
        profileFile: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, upload: null }));
    }
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
    const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const url = `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`;

    const response = await fetch(url, { method: 'POST', body: data });
    const result = await response.json();
    return result.secure_url;
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-2xl transition-opacity duration-500">
        {/* Profile Banner with Picture */}
        <div className="bg-gradient-to-r from-[#26A69A] to-[#148FA8] h-40 sm:h-48 relative rounded-t-lg shadow-sm">
          <div className="absolute bottom-[-4rem] left-4 sm:left-8">
            <div className="relative group transform hover:scale-105 transition duration-300">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-lg">
                {profilePreview ? (
                  <img
                    src={profilePreview}
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
                    className="absolute flex items-center justify-center bg-gray-500  bg-opacity-40 rounded-full opacity-100 transition duration-300"
                  >
                    <FiCamera className="text-white w-2 h-2 sm:w-8 sm:h-8" />
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

        {/* Profile Content Area */}
        <div className="pt-24 sm:pt-28 px-4 sm:px-6 pb-10 space-y-6 bg-white rounded-b-lg shadow-sm">
          {errors.save && <p className="text-red-500 text-sm">{errors.save}</p>}
          {errors.upload && <p className="text-red-500 text-sm">{errors.upload}</p>}

          {/* Conditional Rendering of View or Edit Mode */}
          {isEditing ? (
            <EditProfile
              editedProfile={editedProfile}
              errors={errors}
              handleChange={handleChange}
              handleSave={handleSave}
              handleCancel={handleCancel}
              triggerFileInput={triggerFileInput}
              profilePreview={profilePreview}
              fileInputRef={fileInputRef}
              handleProfilePictureChange={handleProfilePictureChange}
            />
          ) : (
            <ViewProfile
              profile={profile}
              handleEdit={handleEdit}
              handleDeleteAccount={handleDeleteAccount}
            />
          )}

          {/* Delete Account Section (only in view mode) */}
          {!isEditing && <DeleteAccount handleDeleteAccount={handleDeleteAccount} />}
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          showModal={showModal}
          cancelDelete={cancelDelete}
          confirmDelete={confirmDelete}
        />
      </div>
    </div>
  );
};

export default MentorProfile;