import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import PageTransition from "../components/common/PageTransition"
import "../assets/css/MentorDirectory.css"
import axios from "axios"
import { API_URL } from "../config/config"

const MentorDirectory = ({ currentUser }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Categories with domain matching priorities
  const categories = [
    "All",
    "Technology",
    "Business & Entrepreneurship",
    "Career and Professional Growth",
    "Soft Skills and Leadership",
    "Education and Academics",
    "Design & UX",
  ]

  // Domain keywords for better matching
  const domainKeywords = {
    "Technology": ["tech", "software", "developer", "engineering", "programming", "computer"],
    "Business & Entrepreneurship": ["business", "entrepreneur", "startup", "management", "marketing"],
    "Career and Professional Growth": ["career", "professional", "growth", "development", "advancement"],
    "Soft Skills and Leadership": ["leadership", "communication", "soft skills", "teamwork", "management"],
    "Education and Academics": ["education", "academic", "teaching", "learning", "research"],
    "Design & UX": ["design", "ux", "ui", "user experience", "graphic", "visual"]
  }

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${API_URL}/mentee/getMentors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        
        setMentors(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMentors()
  }, [])

  const getMentorDomainScore = (mentor, category) => {
    if (category === "All") return 0
    
    const keywords = domainKeywords[category] || []
    const mentorText = `${mentor.area || ''} ${mentor.bio || ''} ${mentor.skills?.join(' ') || ''}`.toLowerCase()
    
    return keywords.reduce((score, keyword) => {
      return mentorText.includes(keyword.toLowerCase()) ? score + 1 : score
    }, 0)
  }

  const filteredMentors = mentors
    .filter((mentor) => {
      const isApproved = mentor.status === "approved"; 

      const matchesSearch = 
        mentor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = 
        selectedCategory === "All" || 
        getMentorDomainScore(mentor, selectedCategory) > 0

      return isApproved && matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (selectedCategory === "All") return 0
      
      const scoreA = getMentorDomainScore(a, selectedCategory)
      const scoreB = getMentorDomainScore(b, selectedCategory)
      
      // Sort by domain relevance first, then alphabetically by name
      if (scoreA !== scoreB) return scoreB - scoreA
      return a.name.localeCompare(b.name)
    })

  const handleViewProfile = (mentor) => {
    navigate(`/mentee/mentorProfile/${mentor.mentorId}`)
  }

  const handleViewSchedule = (mentor) => {
    navigate(`/mentee/calendar/${mentor.mentorId}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading mentors: {error}
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Mentor</h1>
            <p className="text-gray-600 text-sm">Connect with industry experts to guide your journey</p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col items-center justify-center md:flex-row w-[60%] gap-4 mb-6">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search mentors by name, skills, or expertise..."
                  className="block w-full text-sm pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
                onClick={() => {
                  // Potential search submit action
                }}
              >
                Search
              </button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-[var(--primary-color)] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results Section */}
          {filteredMentors.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
            >
              {filteredMentors.map((mentor) => (
                <motion.div
                  key={mentor.mentorId}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring" }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={mentor.profileUrl || "/default-avatar.png"}
                        alt={mentor.user.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{mentor.user.name}</h3>
                        {mentor.area && (
                          <p className="text-sm text-gray-500">
                            {mentor.area}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-600 line-clamp-3">
                        {mentor.bio || "No bio provided yet."}
                      </p>
                    </div>

                    {mentor.skills?.length > 0 && (
                      <div className="mb-5">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {mentor.skills.slice(0, 4).map((skill, index) => (
                            <span 
                              key={index} 
                              className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewProfile(mentor)}
                        className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        View Profile
                      </button>
                      <button
                        onClick={() => handleViewSchedule(mentor)}
                        className="flex-1 py-2 px-4 bg-[var(--primary-color)] rounded-lg text-white hover:bg-[var(--primary-dark)] transition-colors flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-sm p-8 text-center"
            >
              <div className="mx-auto max-w-md">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No mentors found</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm || selectedCategory !== "All"
                    ? "Try adjusting your search or filter criteria"
                    : "No mentors available at the moment"}
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("All")
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] focus:outline-none"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

export default MentorDirectory