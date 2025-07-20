import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/config';
import DeclineMentorModel from './DeclineMentorModal';

const DeclineButton = ({ mentor, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  const token = localStorage.getItem("token");

  const handleDecline = async (id) => {
    setIsDeclining(true);
    try {
      await axios.put(
        `${API_URL}/admin/decline/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSuccess(id); // Notify parent to update the requests list
    } catch (err) {
      console.error("Decline failed:", err.message);
    } finally {
      setIsDeclining(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-600 text-white px-3 py-1 rounded-md text-xs hover:bg-red-700 transition-colors"
      >
        Decline
      </button>

      <DeclineMentorModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mentor={mentor}
        onDecline={handleDecline}
        isDeclining={isDeclining}
      />
    </>
  );
};

export default DeclineButton;