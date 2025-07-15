import React from 'react';
import { FaTimes, FaFilePdf, FaFileWord, FaFileImage, FaDownload } from 'react-icons/fa';

const DocumentModal = ({ isOpen, onClose, userData, type = 'user' }) => {
  if (!isOpen) return null;

  // Mock document data - in real app, this would come from API
  const documents = [
    {
      id: 1,
      name: 'Resume.pdf',
      type: 'pdf',
      size: '2.3 MB',
      uploadedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Cover Letter.docx',
      type: 'word',
      size: '1.1 MB',
      uploadedAt: '2024-01-15'
    },
    {
      id: 3,
      name: 'Profile Picture.jpg',
      type: 'image',
      size: '850 KB',
      uploadedAt: '2024-01-14'
    },
    {
      id: 4,
      name: 'Certification.pdf',
      type: 'pdf',
      size: '3.2 MB',
      uploadedAt: '2024-01-10'
    }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FaFilePdf className="w-5 h-5 text-red-500" />;
      case 'word':
        return <FaFileWord className="w-5 h-5 text-blue-500" />;
      case 'image':
        return <FaFileImage className="w-5 h-5 text-green-500" />;
      default:
        return <FaFilePdf className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleDownload = (document) => {
    console.log(`Downloading ${document.name}`);
    // In real app, this would trigger actual download
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.name || 'User')}&background=6366f1&color=fff&size=48`}
                alt={userData?.name || 'User'}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {userData?.name || 'User'} Documents
              </h2>
              <p className="text-sm text-gray-600">
                {type === 'mentor' ? 'Mentor' : 'User'} ID: {userData?.id || 'N/A'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Uploaded Documents</h3>
            <p className="text-sm text-gray-600">
              View and manage documents uploaded by {userData?.name || 'this user'}.
            </p>
          </div>

          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(doc.type)}
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      {doc.size} • Uploaded {doc.uploadedAt}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(doc)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FaDownload className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>

          {documents.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <FaFilePdf className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500">No documents uploaded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentModal; 