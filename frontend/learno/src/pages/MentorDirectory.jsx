import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import PageTransition from "../components/common/PageTransition"
import "../assets/css/MentorDirectory.css"
import axios from "axios"
import { API_URL } from "../config/config"

const MentorDirectory = ({ users, currentUser, sessionRequests, setSessionRequests, simulateLoading }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isFiltering, setIsFiltering] = useState(false)
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const navigate = useNavigate()

   useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = localStorage.getItem('token'); // Get stored JWT
        const response = await axios.get(
          `${API_URL}/mentee/getMentors`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token
            },
          }
        );
        setMentors(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchMentors()
  }, [])

   useEffect(() => {
    setIsFiltering(true)
    const timer = setTimeout(() => {
      setIsFiltering(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchTerm, selectedCategory])
 

   if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

   if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      Error loading mentors: {error}
    </div>
  );
  const domainCategories = {
    "Web & Mobile": ["Web Development", "Mobile Development", "Frontend Development", "Backend Development"],
    "Data & AI": ["Data Science", "Machine Learning", "Artificial Intelligence", "Big Data"],
    "Design": ["UI/UX Design", "Graphic Design", "Product Design"],
    "DevOps & Cloud": ["DevOps", "Cloud Computing", "System Administration"],
    "Security": ["Cybersecurity", "Network Security", "Ethical Hacking"],
    "Other": ["Game Development", "Blockchain", "IoT", "Embedded Systems"],
  }

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
    (mentor.name && typeof mentor.name === 'string' && mentor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (mentor.bio && typeof mentor.bio === 'string' && mentor.bio.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (Array.isArray(mentor.skills) && mentor.skills.some((skill) => typeof skill === 'string' && skill.toLowerCase().includes(searchTerm.toLowerCase()))) ||
    (mentor.area && typeof mentor.area === 'string' && mentor.area.toLowerCase().includes(searchTerm.toLowerCase())) ||
    false;

    const matchesCategory =
      !selectedCategory ||
      (mentor.area &&
        Object.entries(domainCategories).some(
          ([category, domains]) => category === selectedCategory && domains.includes(mentor.area),
        ))

    return matchesSearch && matchesCategory
  })

  const handleViewProfile = (mentor) => {
    navigate(`/mentor/${mentor.mentorId}`)
  }

  const handleViewSchedule = (mentor) => {
    navigate(`/mentee/calendar/${mentor.mentorId}`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-3xl font-bold mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          Find a Mentor
        </motion.h1>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, skill, or domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              autoFocus
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === "" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedCategory("")}
            >
              <i className="fas fa-globe mr-2"></i>
              All Categories
            </button>

            {Object.keys(domainCategories).map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <i className={`fas ${
                  category === "Web & Mobile" ? "fa-laptop-code" :
                  category === "Data & AI" ? "fa-brain" :
                  category === "Design" ? "fa-paint-brush" :
                  category === "DevOps & Cloud" ? "fa-cloud" :
                  category === "Security" ? "fa-shield-alt" : "fa-code-branch"
                } mr-2`}></i>
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {isFiltering ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredMentors.length > 0 ? (
              filteredMentors.map((mentor) => (
                <motion.div 
                  key={mentor.mentorId} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  variants={itemVariants}
                  layout
                >
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <img
                        src={mentor.profileUrl}
                        alt={mentor.title}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h2 className="text-xl font-semibold">{mentor.title}</h2>
                        {mentor.area && (
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {mentor.area}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{mentor.bio}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.skills?.map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between">
                      <motion.button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={() => handleViewSchedule(mentor)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book Session
                      </motion.button>
                      <motion.button
                        className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition"
                        onClick={() => handleViewProfile(mentor)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Profile
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-500 mb-4">No mentors found matching your criteria.</p>
                <motion.button
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("")
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </PageTransition>
  )
}

export default MentorDirectory
