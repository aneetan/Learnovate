import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RegistrationForm from './pages/RegistrationForm';
import ProtectedRoutes from './security/ProtectedRoutes';
import MenteeLayout from './components/Layout/MenteeLayout';
import AdminLayout from './components/Layout/AdminLayout';
import MentorStepperForm from './pages/MentorStepperForm';
import Home from './pages/Home';
import MentorDirectory from './pages/MentorDirectory';
import MentorLayout from './components/Layout/MentorLayout';
import MenteeProfileStep from './pages/MenteeProfileStep';
import MentorDashboard from "./pages/mentor/MentorDashboard";
import MenteeProfile from "./pages/Mentee/MenteeProfile";
import MentorProfile from "./pages/mentor/MentorProfile";

import AvailabilitySchedule from './components/Mentor/AvailabilitySchedule';
import CalendarPreview from './pages/Mentee/CalendarPreview';
import BookingRequest from './pages/Mentee/BookingRequest';
import MenteeDashboard from './pages/Mentee/MenteeDashboard';
import MentorDashboard from './pages/mentor/MentorDashboard';
import CheckoutPage from './pages/Mentee/CheckoutPage';
import EsewaSuccess from './components/EsewaSuccess';
import EsewaFailure from './components/EsewaFailure';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route path="/findMentor" element={<MentorDirectory />} />
        <Route path="/unauthorized" element={<div> You are unauthorized! Get lost</div>} />


         <Route path="/payment-success" element={<EsewaSuccess />} />
        <Route path="/payment-failure" element={<EsewaFailure />} />

        <Route path="/ment" element={<MentorLayout />}>
          <Route path="/ment/dashboard" element={<Test />} />
          {/* Other routes */}
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["MENTEE"]} />}>
          <Route path='/mentee' element={<MenteeLayout />}>
            <Route path='/mentee/dashboard' element={<MenteeDashboard/>}/>
            <Route path='/mentee/booking-request/:mentorId' element={<BookingRequest />} />
            <Route path='/mentee/viewMentors' element={<MentorDirectory />} />
            <Route path='/mentee/calendar/:mentorId' element={<CalendarPreview />} />
            <Route path="/mentee/checkout/:mentorId/:bookingId" element={<CheckoutPage />} />
            <Route path="/mentee/menteeProfile" element={<MenteeProfile />} />
          </Route>
          <Route path='/mentee/registerDetails' element={<MenteeProfileStep />} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["MENTOR"]}/>}>
          <Route path='/mentor' element={<MentorLayout/>}>
            <Route path='/mentor/dashboard' element={<MentorDashboard/>}/>
            <Route path='/mentor/dashboard' element={<MentorDashboard/>}/>
            <Route path='/mentor/availability' element={<AvailabilitySchedule/>}/>
            <Route path="/mentorProfile" element={<MentorProfile />} />
          </Route>
          <Route path='/mentor/registerDetails' element={<MentorStepperForm/>}/>
        </Route>

         <Route element={<ProtectedRoutes allowedRoles={["ADMIN"]}/>}>
          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='/admin/dashboard' element={<div> This is admin </div>}/>
          </Route>
        </Route>

      </Routes>
    </Router>
  )
}

export default App
