import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/config';
import ApproveMentorModel from './ApproveMentorModel';
import DeclineMentorModel from './DeclineMentorModal';

const MentorStatusButton = ({ mentor, onStatusChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const token = localStorage.getItem("token");

  const handleAction = async (action) => {
    setIsProcessing(true);
    try {
      await axios.put(
        `${API_URL}/admin/${action}/${mentor.mentorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onStatusChange(mentor.mentorId, action === 'approve' ? 'Accepted' : 'Rejected');
    } catch (err) {
      console.error(`${action} failed:`, err.message);
    } finally {
      setIsProcessing(false);
      setIsModalOpen(false);
    }
  };

  if (mentor.status === 'pending') {
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
          onApprove={() => handleAction('approve')}
          isApproving={isProcessing}
        />
      </>
    );
  }

  if (mentor.status === 'declined') {
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
          onApprove={() => handleAction('approve')}
          isApproving={isProcessing}
        />
      </>
    );
  }

  if (mentor.status === 'approved') {
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
          onDecline={() => handleAction('decline')}
          isDeclining={isProcessing}
        />
      </>
    );
  }

  return null;
};

export default MentorStatusButton;