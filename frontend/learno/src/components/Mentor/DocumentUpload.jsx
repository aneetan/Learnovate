import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'

const DocumentUpload = ({onFinish, initialValues}) => {
    const [profile, setProfile] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);
    const [documents, setDocuments] = useState([]);

  const handleProfileChange = (e) => {
     const file = e.target.files[0];
    setProfile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentsChange = (e) => {
    setDocuments(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (profile) formData.append("profile", profile);
    documents.forEach((doc, index) => {
      formData.append(`documents[${index}]`, doc);
    });
  };

  return (
    <>
    <Form onFinish={onFinish} initialValues={initialValues}>
            <div className='container flex  justify-between'>
                <div className='w-full px-4 md:px-8'>
                    <label className="block text-lg font-medium text-gray-700 mb-1">
                            Upload your Profile Picture
                  <p className='text-xs font-light'> (This accepts only JPG, JPEG and PNG files) </p>
                      </label>
                 <div className="flex flex-col items-center">
                     <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                   <img
                       src={
                       profilePreview ||
                       "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                       }
                       alt="Profile Preview"
                       className="object-cover w-full h-full"
                />
                     </div>
               <input
               type="file"
               accept="image/*"
               onChange={handleProfileChange}
               className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50"
               />
               </div>
                </div>
            </div>

            <div className='container flex  justify-between'>
                <div className='w-full px-4 mt-7 md:px-8'>
                     <label className="block text-lg font-medium text-gray-700 mb-1">
                        Add Relevant Document (for Verification)
                        <p className='text-xs font-light'> (This accepts only PDF and Word documents) </p>  
                    </label>

                        <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        multiple
                        onChange={handleDocumentsChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50"
                        />
                        {documents.length > 0 && (
                        <ul className="mt-2 list-disc list-inside text-sm text-green-600">
                            {documents.map((doc, idx) => (
                            <li key={idx}>{doc.name}</li>
                            ))}
                        </ul>
                        )}
                </div>
            </div>
        

            

            <div className="w-full mt-6 md:w-[14%] float-right">
                <Button type="primary"
                htmlType="submit"
                className="w-full md:w-auto mr-12 hover:drop-shadow-md hover:scale-102 transition
                cursor-pointer duration-300 ease-in-out font-bold"
                >
                Submit
                </Button>
            </div>
        </Form>
    </>
     
  )
}

export default DocumentUpload
