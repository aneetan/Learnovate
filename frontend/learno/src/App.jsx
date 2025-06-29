import './App.css';
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
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminMentors from "./pages/AdminMentors";
import AdminBookings from "./pages/AdminBookings";
import AdminReviews from './pages/AdminReviews';
import AvailabilitySchedule from './components/Mentor/AvailabilitySchedule';
import CalendarPreview from './pages/Mentee/CalendarPreview';
import BookingRequest from './pages/Mentee/BookingRequest';
import MenteeDashboard from './pages/Mentee/MenteeDashboard';
import MentorDashboard from './pages/mentor/MentorDashboard';
import CheckoutPage from './pages/Mentee/CheckoutPage';
import EsewaSuccess from './components/EsewaSuccess';
import EsewaFailure from './components/EsewaFailure';
import MentorSessions from './pages/mentor/MentorSessions';
import AdminSettings from "./pages/AdminSettings";

// ✅ Add chat component imports
import MenteeChat from './websocket/MenteeChat';
import MentorChat from './websocket/MentorChat';
import MentorDashboard from './pages/mentor/MentorDashboard';
// import Notifications from './notifications/Notifications';
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
        <Route path="/unauthorized" element={<div>You are unauthorized! Get lost</div>} />

        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment/success/:transaction_uuid?" element={<EsewaSuccess />} />
        <Route path="/payment/failure" element={<EsewaFailure />} />

        <Route path="/admin/notify" element={<AdminNotifications/>} />

        {/* ✅ Admin routes */}
        <Route path='/test-adminDashboard' element={<AdminLayout />}>
          <Route path='' element={<AdminDashboard />} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='mentors' element={<AdminMentors />} />
          <Route path='bookings' element={<AdminBookings />} />
          <Route path='reviews' element={<AdminReviews />} />
          <Route path='settings' element={<AdminSettings />} />
        </Route>

        {/* ✅ Mentee protected routes */}
        <Route element={<ProtectedRoutes allowedRoles={["MENTEE"]} />}>
          <Route path='/mentee' element={<MenteeLayout />}>
            <Route path='dashboard' element={<MenteeDashboard />} />
            <Route path='booking-request/:mentorId' element={<BookingRequest />} />
            <Route path='viewMentors' element={<MentorDirectory />} />
            <Route path='calendar/:mentorId' element={<CalendarPreview />} />
            <Route path='menteeProfile' element={<MenteeProfile />} />
            <Route path='chat' element={<MenteeChat />} /> {/* ✅ Chat route added */}
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
          <Route path='/mentor/registerDetails' element={<MentorStepperForm />} />
          <Route path='/mentor/confirmation' element={<EmailConfirmationPage/>}/>

        </Route>

        {/* Empty ADMIN route placeholder (optional, can remove if not used) */}
        <Route element={<ProtectedRoutes allowedRoles={["ADMIN"]} />}></Route>

      </Routes>
    </Router>
  );
}

export default App;
