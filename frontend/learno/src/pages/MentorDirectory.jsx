import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import PageTransition from "../components/common/PageTransition"
import "../assets/css/MentorDirectory.css"
import axios from "axios"
import { API_URL } from "../config/config"

const MentorDirectory = ({ currentUser, sessionRequests, setSessionRequests, simulateLoading }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isFiltering, setIsFiltering] = useState(false)
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const domainCategories = {
    "Web & Mobile": ["Web Development", "Mobile Development", "Frontend Development", "Backend Development"],
    "Data & AI": ["Data Science", "Machine Learning", "Artificial Intelligence", "Big Data"],
    Design: ["UI/UX Design", "Graphic Design", "Product Design"],
    "DevOps & Cloud": ["DevOps", "Cloud Computing", "System Administration"],
    Security: ["Cybersecurity", "Network Security", "Ethical Hacking"],
    Other: ["Game Development", "Blockchain", "IoT", "Embedded Systems"],
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

  useEffect(() => {
    setIsFiltering(true)
    const timer = setTimeout(() => {
      setIsFiltering(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchTerm, selectedCategory])

  const filteredMentors = mentors.filter((mentor) => {
    const lowerSearch = searchTerm.toLowerCase()

    const matchesSearch =
      (mentor.name && mentor.name.toLowerCase().includes(lowerSearch)) ||
      (mentor.bio && mentor.bio.toLowerCase().includes(lowerSearch)) ||
      (Array.isArray(mentor.skills) && mentor.skills.some((skill) => skill.toLowerCase().includes(lowerSearch))) ||
      (mentor.area && mentor.area.toLowerCase().includes(lowerSearch))

    const matchesCategory =
      !selectedCategory ||
      (mentor.area &&
        Object.entries(domainCategories).some(
          ([category, domains]) => category === selectedCategory && domains.includes(mentor.area)
        ))

    return matchesSearch && matchesCategory
  })

  const handleViewProfile = (mentor) => {
    navigate(`/mentor/${mentor.mentorId}`)
  }

  const handleViewSchedule = (mentor) => {
    navigate(`/mentee/calendar/${mentor.mentorId}`)
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
      <div className="mentor-directory">
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Find a Mentor
          </motion.h1>

          <motion.div
            className="search-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="search-bar">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                placeholder="Search by name, skill, or domain..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                autoFocus
              />
            </div>

            <div className="filters">
              <div className="domain-categories">
                <button
                  className={`category-btn ${selectedCategory === "" ? "active" : ""}`}
                  onClick={() => setSelectedCategory("")}
                >
                  <i className="fas fa-globe"></i> All Categories
                </button>
                {Object.keys(domainCategories).map((category) => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <i className={`fas ${
                      category === "Web & Mobile" ? "fa-laptop-code" :
                      category === "Data & AI" ? "fa-brain" :
                      category === "Design" ? "fa-paint-brush" :
                      category === "DevOps & Cloud" ? "fa-cloud" :
                      category === "Security" ? "fa-shield-alt" : "fa-code-branch"
                    }`} />
                    {category}
                  </button>
                ))}
              </div>

              <div className="mentors-grid">
                {isFiltering ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-400"></div>
                  </div>
                ) : filteredMentors.length > 0 ? (
                  filteredMentors.map((mentor, index) => (
                    <motion.div key={mentor.mentorId} className="mentor-card" variants={itemVariants} layout>
                      <div className="mentor-header">
                        <img
                          src={mentor.profileUrl || "/placeholder.svg"}
                          alt={mentor.name}
                          className="mentor-image"
                        />
                        <div className="mentor-info">
                          <h2>{mentor.title || mentor.name}</h2>
                          {mentor.area && (
                            <div className="domain-badge">
                              <i className="fas fa-globe"></i> {mentor.area}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mentor-bio">
                        <p>{mentor.bio || "No bio provided."}</p>
                      </div>

                      <div className="mentor-skills">
                        {mentor.skills?.map((skill, index) => (
                          <span key={index} className="skill-badge">
                            <i className="fas fa-code"></i> {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mentor-actions">
                        <motion.button
                          className="btn btn-primary"
                          onClick={() => handleViewSchedule(mentor)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className="fas fa-calendar-alt"></i> Book Session
                        </motion.button>
                        <motion.button
                          className="btn btn-outline"
                          onClick={() => handleViewProfile(mentor)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className="fas fa-user"></i> View Profile
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div className="no-mentors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <p>No mentors found matching your criteria.</p>
                    <motion.button
                      className="btn btn-outline"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory("")
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fas fa-sync-alt"></i> Clear Filters
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

export default MentorDirectory
