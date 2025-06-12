import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RegistrationForm from './pages/RegistrationForm';
import Dashboard from './pages/Dashboard';
import MentorDashboard from './pages/MentorDashboard';
import ProtectedRoutes from './security/ProtectedRoutes';
import MenteeLayout from './components/Layout/MenteeLayout';
import AdminLayout from './components/Layout/AdminLayout';
import MentorStepperForm from './pages/MentorStepperForm';
import Home from './pages/Home';
import MentorDirectory from './pages/MentorDirectory';
import MentorLayout from './components/Layout/MentorLayout';
import MenteeProfileStep from './pages/MenteeProfileStep';
import Test from "./pages/mentor/MentorDashboard";
import AvailabilitySchedule from './components/Mentor/AvailabilitySchedule';
import CalendarPreview from './pages/Mentee/CalendarPreview';
import BookingRequest from './pages/Mentee/BookingRequest';
import MenteeDashboard from './pages/Mentee/MenteeDashboard';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route path="/findMentor" element={<MentorDirectory />} />
        <Route path="/unauthorized" element={<div> You are unauthorized! Get lost</div>} />

        <Route path="/ment" element={<MentorLayout />}>
          <Route path="/ment/dashboard" element={<Test />} />
          {/* Other routes */}
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["MENTEE"]} />}>
          <Route path='/mentee' element={<MenteeLayout />}>
            <Route path='/mentee/dashboard' element={<MenteeDashboard/>}/>
            <Route path='/mentee/booking-request/1' element={<BookingRequest />} />
            <Route path='/mentee/viewMentors' element={<MentorDirectory />} />
            <Route path='/mentee/calendar' element={<CalendarPreview />} />
          </Route>
          <Route path='/mentee/registerDetails' element={<MenteeProfileStep />} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["MENTOR"]}/>}>
          <Route path='/mentor' element={<MentorLayout/>}>
            <Route path='/mentor/dashboard' element={<Test/>}/>
            <Route path='/mentor/dashboard' element={<MentorDashboard/>}/>
            <Route path='/mentor/availability' element={<AvailabilitySchedule/>}/>
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
