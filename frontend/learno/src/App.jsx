import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RegistrationForm from './pages/RegistrationForm';
import ProtectedRoutes from './security/ProtectedRoutes';
import MenteeLayout from './components/layout/MenteeLayout';
import AdminLayout from './components/Layout/AdminLayout';
import MentorStepperForm from './pages/MentorStepperForm';
import Home from './pages/Home';
import MentorDirectory from './pages/MentorDirectory';
import MentorLayout from './components/Layout/MentorLayout';
import MenteeProfileStep from './pages/MenteeProfileStep';
import MenteeProfile from "./pages/Mentee/MenteeProfile";
import MentorProfile from "./pages/mentor/MentorProfile";

import AvailabilitySchedule from './components/Mentor/AvailabilitySchedule';
import CalendarPreview from './pages/Mentee/CalendarPreview';
import BookingRequest from './pages/Mentee/BookingRequest';
import MenteeDashboard from './pages/Mentee/MenteeDashboard';
import CheckoutPage from './pages/Mentee/CheckoutPage';
import EsewaSuccess from './components/EsewaSuccess';
import EsewaFailure from './components/EsewaFailure';
import MenteeChat from './websocket/MenteeChat';
import MentorChat from './websocket/MentorChat';
import MentorDashboard from './pages/mentor/MentorDashboard';
import Notifications from './notifications/Notifications';
import UserRequestForm from './notifications/UserRequestForm';
import AdminNotifications from './notifications/AdminNotifications';
import EmailConfirmationPage from './pages/EmailConfirmationPage';

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

        <Route path="/noti" element={<Notifications/>} />
        <Route path="/mentor/notify" element={<UserRequestForm/>} />
        <Route path="/admin/notify" element={<AdminNotifications/>} />





        <Route element={<ProtectedRoutes allowedRoles={["MENTEE"]} />}>
          <Route path='/mentee' element={<MenteeLayout />}>
            <Route path='/mentee/dashboard' element={<MenteeDashboard/>}/>
            <Route path='/mentee/booking-request/:mentorId' element={<BookingRequest />} />
            <Route path='/mentee/viewMentors' element={<MentorDirectory />} />
            <Route path='/mentee/calendar/:mentorId' element={<CalendarPreview />} />
            <Route path="/mentee/checkout/:mentorId/:bookingId" element={<CheckoutPage />} />
            <Route path="/mentee/menteeProfile" element={<MenteeProfile />} />
            <Route path='/mentee/chat' element={<MenteeChat/>} />
          </Route>
          <Route path='/mentee/registerDetails' element={<MenteeProfileStep />} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["MENTOR"]}/>}>
          <Route path='/mentor' element={<MentorLayout/>}>
            <Route path='availability' element={<AvailabilitySchedule/>}/>
            <Route path="profile" element={<MentorProfile />} />
            <Route path='/mentor/dashboard' element={<MentorDashboard/>}/>
            <Route path='/mentor/availability' element={<AvailabilitySchedule/>}/>
            <Route path="/mentorProfile" element={<MentorProfile />} />
            <Route path='/mentor/chat' element={<MentorChat/>} />
          </Route>
          <Route path='/mentor/registerDetails' element={<MentorStepperForm/>}/>
          <Route path='/mentor/confirmation' element={<EmailConfirmationPage/>}/>

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
