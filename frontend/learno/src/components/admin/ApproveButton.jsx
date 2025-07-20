import React, { useState } from 'react';
import { API_URL } from '../../config/config';
import axios from 'axios';
import ApproveMentorModel from './ApproveMentorModel';

const ApproveButton = ({ mentor, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const token = localStorage.getItem("token");

  const handleApprove = async (id) => {
    setIsApproving(true);
    try {
      await axios.put(
        `${API_URL}/admin/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSuccess(id); // Notify parent to update the requests list
    } catch (err) {
      console.error("Approval failed:", err.message);
    } finally {
      setIsApproving(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-white px-3 py-1 rounded-md text-xs transition-colors"
        style={{ backgroundColor: 'var(--primary-color)' }}
      >
        Approve
      </button>

      <ApproveMentorModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mentor={mentor}
        onApprove={handleApprove}
        isApproving={isApproving}
      />
    </>
  );
};

export default ApproveButton;