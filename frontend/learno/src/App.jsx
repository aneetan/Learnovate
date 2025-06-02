import { useState } from 'react'
import './App.css'
import 'flowbite';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
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
import MentorLayout from './components/layout/MentorLayout';
import MenteeProfileStep from './components/Auth/MenteeProfileStep';
import Test from "./pages/mentor/MentorDashboard";
import AvailabilitySchedule from './components/Mentor/AvailabilitySchedule';
import CalendarPreview from './pages/Mentee/CalendarPreview';
import BookingRequest from './pages/Mentee/BookingRequest';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path='/mentee/calendar' element={<CalendarPreview/>}/>
        <Route path='/mentee/booking-request' element={<BookingRequest/>} />

        <Route path="/findMentor" element={<MentorDirectory />} />
        <Route path="/unauthorized" element={<div> You are unauthorized! Get lost</div>} />

<Route path="/ment" element={<MentorLayout />}>
          <Route path="dashboard" element={<Test />} />
          {/* Other routes */}
        </Route>


        <Route element={<ProtectedRoutes allowedRoles={["MENTEE"]}/>}>
          <Route path='/mentee' element={<MenteeLayout/>}>
            <Route path='/mentee/dashboard' element={<Dashboard/>}/>
            <Route path="/mentee/registerDetails" element={<MenteeProfileStep />} />

          </Route>
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["ADMIN"]}/>}>
          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='/admin/dashboard' element={<div> This is admin </div>}/>
            
          </Route>
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["MENTOR"]}/>}>
        
          <Route path='/mentor' element={<MenteeLayout/>}>
            <Route path='/mentor/registerDetails' element={<MentorStepperForm/>}/>
            <Route path='/mentor/dashboard' element={<MentorDashboard/>}/>
            <Route path='/mentor/registerDetails' element={<MentorStepperForm/>}/>
            <Route path='/mentor/availability' element={<AvailabilitySchedule/>}/>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
