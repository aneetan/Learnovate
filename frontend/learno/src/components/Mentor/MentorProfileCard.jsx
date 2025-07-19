import React from 'react'

const MentorProfileCard = (mentor) => {
  return (
     <div className="bg-white rounded-b-lg shadow-lg pt-20 pb-8 px-8 mt-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">{mentor.user.name}</h2>
          <p className="text-center text-gray-500 mb-6">{mentor.title}</p>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <span className="block text-xs text-gray-500 mb-1">Name</span>
              <span className="text-gray-800">{mentor.user.name}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Email</span>
              <span className="text-gray-800">{mentor.user.email}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Phone Number</span>
              <span className="text-gray-800">{mentor.phoneNumber}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Bio</span>
              <span className="text-gray-800 whitespace-pre-line">{mentor.bio}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Session Price (Nrs.)</span>
              <span className="text-gray-800">Nrs. {mentor.session}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Area of Expertise</span>
              <span className="text-gray-800">{mentor.area}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Professional Title</span>
              <span className="text-gray-800">{mentor.title}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Years of Experience</span>
              <span className="text-gray-800">{mentor.experience}</span>
            </div>
          </div>
        </div>
  )
}

export default MentorProfileCard
