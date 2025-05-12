import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Stepper from "./Stepper"
import RegisterStep from "./RegisterStep"
import SelectRoleStep from "./SelectRoleStep"
import AdditionalInfoMentorStep from "./AdditionalInfoMentorStep"
import MenteeProfileStep from "./MenteeProfileStep"
import ProfessionalInfoMentorStep from "./ProfessionalInfoMentorStep"
import RegistrationCompleteMenteeStep from "./RegistrationCompleteMenteeStep"
import DocumentUploadsMentorStep from "./DocumentUploadsMentorStep"

const Register = ({ setIsAuthenticated, setCurrentUser, users, setUsers }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    bio: "",
    phoneNumber: "",
    sessionPrice: "",
    areaOfExpertise: "",
    professionalTitle: "",
    yearsOfExperience: "",
    skills: "",
    profilePicture: null,
    documents: null,
    currentStatus: "",
    interestArea: "",
    agreedToTerms: false,
  })
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0]
      setFormData({
        ...formData,
        [e.target.name]: file || null,
      })
    } else if (e.target.type === "checkbox") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,
      })
    } else if (e.target.name === "skills") {
      setFormData({ ...formData, skills: e.target.value })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match")
        return
      }
    }
    if (step < (formData.role === "mentor" ? 5 : 4)) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSkip = () => {
    if (step === 3 && formData.role === "mentee") {
      setStep(4)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (users.some((user) => user.email === formData.email)) {
      alert("Email already registered")
      return
    }

    setLoading(true)

    setTimeout(() => {
      const newUser = {
        id: users.length + 1,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(formData.role === "mentor" && {
          bio: formData.bio,
          phoneNumber: formData.phoneNumber,
          sessionPrice: formData.sessionPrice,
          areaOfExpertise: formData.areaOfExpertise,
          professionalTitle: formData.professionalTitle,
          yearsOfExperience: formData.yearsOfExperience,
          skills: formData.skills,
          profilePicture: formData.profilePicture,
          documents: formData.documents,
          availability: "Flexible",
          rating: 0,
        }),
        ...(formData.role === "mentee" && {
          phoneNumber: formData.phoneNumber,
          profilePicture: formData.profilePicture,
          currentStatus: formData.currentStatus,
          interestArea: formData.interestArea,
        }),
      }

      setUsers([...users, newUser])
      setIsAuthenticated(true)
      setCurrentUser(newUser)
      alert("Registration successful!")
      navigate("/profile")
      setLoading(false)
    }, 1000)
  }

  const handleGoogleSignup = () => {
    setLoading(true)
    setTimeout(() => {
      alert("Google Sign-Up functionality is not implemented in this demo.")
      setLoading(false)
    }, 1000)
  }

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return <RegisterStep formData={formData} handleChange={handleChange} />
      case 2:
        return <SelectRoleStep formData={formData} handleChange={handleChange} />
      case 3:
        return formData.role === "mentor" ? (
          <AdditionalInfoMentorStep formData={formData} handleChange={handleChange} />
        ) : formData.role === "mentee" ? (
          <MenteeProfileStep formData={formData} handleChange={handleChange} />
        ) : null
      case 4:
        return formData.role === "mentor" ? (
          <ProfessionalInfoMentorStep formData={formData} handleChange={handleChange} />
        ) : formData.role === "mentee" ? (
          <RegistrationCompleteMenteeStep formData={formData} handleChange={handleChange} />
        ) : null
      case 5:
        return formData.role === "mentor" ? (
          <DocumentUploadsMentorStep formData={formData} handleChange={handleChange} />
        ) : null
      default:
        return null
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[100vh] p-6 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1350&q=80')] bg-no-repeat bg-center bg-cover bg-[#26A69A] bg-blend-overlay font-sans relative">
      <div className="before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[#26A69A] before:opacity-80 before:z-[-1] after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1350&q=80')] after:bg-no-repeat after:bg-center after:bg-cover after:opacity-20 after:z-[-2]"></div>
      <div className={`bg-white rounded-lg shadow-md p-10 w-full max-w-[850px] border border-gray-200 transition-all duration-300 relative z-1 flex flex-col justify-center ${step > 2 ? 'max-w-[950px]' : ''}`}>
        <h2 className="text-center mb-8 text-gray-900 font-bold text-3xl relative after:content-[''] after:absolute after:bottom-[-0.5rem] after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-1 after:bg-[#26A69A] after:rounded">Register for Learnovate</h2>
        {step > 2 && <Stepper step={step} role={formData.role} />}
        <form onSubmit={step === (formData.role === "mentor" ? 5 : 4) ? handleSubmit : handleNext}>
          {renderStepComponent()}
          <div className="flex flex-row items-center gap-4 mt-8">
            {/* Back button */}
            {step > 1 && (
              <button
                type="button"
                className="flex-grow bg-gray-500 text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-gray-600 hover:-translate-y-px transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={handleBack}
                disabled={loading}
              >
                Back
              </button>
            )}
            {/* Next/Register button */}
            <button
              type="submit"
              className="flex-grow bg-[#26A69A] text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-[#20897f] hover:-translate-y-px transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={loading || (step === (formData.role === "mentor" ? 5 : 4) && !formData.agreedToTerms) || (step === 2 && !formData.role)}
            >
              {loading ? "Processing..." : step === (formData.role === "mentor" ? 5 : 4) ? "Register" : "Next"}
            </button>
            {/* Skip button */}
            {step === 3 && formData.role === "mentee" && (
              <button
                type="button"
                className="flex-grow bg-gray-500 text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-gray-600 hover:-translate-y-px transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={handleSkip}
                disabled={loading}
              >
                Skip
              </button>
            )}
          </div>
        </form>
        {step === 1 && (
          <div className="flex-1 flex flex-col justify-center items-center w-full min-h-[100px]">
            <div className="flex flex-col justify-center items-center w-full text-center relative before:content-['or'] before:block before:text-gray-500 before:text-sm before:mb-4 before:w-full before:relative before:[&::before]:content-[''] before:[&::before]:absolute before:[&::before]:top-1/2 before:[&::before]:w-2/5 before:[&::before]:h-px before:[&::before]:bg-gray-300 before:[&::before]:transform before:[&::before]:-translate-y-1/2 before:[&::before]:left-0 before:[&::after]:content-[''] before:[&::after]:absolute before:[&::after]:top-1/2 before:[&::after]:w-2/5 before:[&::after]:h-px before:[&::after]:bg-gray-300 before:[&::after]:transform before:[&::after]:-translate-y-1/2 before:[&::after]:right-0">
              <button
                type="button"
                className="bg-transparent text-gray-900 border border-gray-300 flex items-center justify-center gap-3 px-8 py-3 text-base -font-sans tracking-wide rounded-full shadow-md hover:bg-gray-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 w-full relative overflow-hidden disabled:bg-transparent disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none disabled:border-gray-300 before:content-[''] before:w-6 before:h-6 before:bg-[url('https://www.google.com/favicon.ico')] before:bg-no-repeat before:bg-center before:bg-[length:20px] before:rounded before:mr-3 before:disabled:opacity-50 after:content-[''] after:absolute after:top-0 after:left-[-100%] after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-[rgba(255,255,255,0.2)] after:to-transparent after:transition-all after:duration-500 hover:after:left-full"
                onClick={handleGoogleSignup}
                disabled={loading}
              >
                Sign Up with Google
              </button>
            </div>
          </div>
        )}
        <div className="mt-8 text-center pt-6 border-t border-gray-200 text-gray-500 text-sm">
          <p>
            Already have an account? <Link to="/login" className="text-[#26A69A] font-medium hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register