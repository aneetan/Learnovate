import React, { useEffect } from 'react';
import { auth, googleProvider } from '../firebase/firebase';
import { getAuth, signInWithPopup} from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { API_URL, getUserId } from '../config/config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleLoginButton = () => {
    const navigate = useNavigate();
  const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const idToken = await user.getIdToken();
 
      // Send ID token to backend
      const response = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({idToken})
    });
       
      const responseData = await response.json();
      localStorage.setItem("token", responseData.jwt)
      const userId = getUserId(responseData.jwt);

      try {
        const response = await axios.get(`${API_URL}/auth/getUsers/${userId}`, {})

         if(response.data.detailsFilled === true){
          navigate('/mentee/dashboard')
        } else {
          navigate('/mentee/registerDetails')
        }

      } catch (err) {
        console.log(err.message)
      }     
    } catch (error) {
      console.error('Error during sign-in:', error.message);
    }
  };

  return (
    <>
        <button
            type="button"
            className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-100 transition duration-300 shadow-sm"
            onClick={signInWithGoogle}
            >
            <FcGoogle size={22} />
            Sign up with Google
        </button>
    </>
  );
};

export default GoogleLoginButton;