import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RegistrationForm from './pages/RegistrationForm';
import ProtectedRoutes from './security/ProtectedRoutes';
import MenteeLayout from './components/Mentee/MenteeLayout';
import AdminLayout from './components/admin/AdminLayout';
import MentorStepperForm from './pages/mentor/MentorStepperForm';
import Home from './pages/Home';
import MentorDirectory from './pages/Mentee/MentorDirectory';
import MentorLayout from './components/Mentor/MentorLayout';
import MenteeProfileStep from './pages/Mentee/MenteeProfileStep';
import MenteeProfile from "./pages/Mentee/MenteeProfile";
import MentorProfile from "./pages/mentor/MentorProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminMentors from "./pages/admin/AdminMentors";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminReviews from './pages/admin/AdminReviews';
import CalendarPreview from './pages/Mentee/CalendarPreview';
import BookingRequest from './pages/Mentee/BookingRequest';
import MenteeDashboard from './pages/Mentee/MenteeDashboard';
import MentorDashboard from './pages/mentor/MentorDashboard'; 
import CheckoutPage from './pages/Mentee/CheckoutPage';
import EsewaSuccess from './components/payment/EsewaSuccess';
import EsewaFailure from './components/payment/EsewaFailure';
import MentorSessions from './pages/mentor/MentorSessions';
import AdminSettings from "./pages/admin/AdminSettings";
import AdminMentorProfile from './pages/admin/AdminMentorProfile';
import MenteeChat from './pages/Mentee/MenteeChat';
import MentorChat from './pages/mentor/MentorChat';
import AdminNotifications from './notifications/AdminNotifications';
import EmailConfirmationPage from './pages/Mentee/EmailConfirmationPage';
import DeclinedPage from './pages/Mentee/EmailConfirmationPage';
import ForgotPassword from './pages/forgotpw/ForgotPassword';
import ForgotPasswordEmail from './pages/forgotpw/ForgotPasswordEmail';
import ForgotPasswordOtp from './pages/forgotpw/ForgotPasswordOtp';
import ResetPassword from './pages/forgotpw/ResetPassword';
import Availability from './pages/mentor/Availability';
import EditAvailability from './components/Mentor/EditAvailability';
import MenteeSessions from './pages/Mentee/MenteeSessions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-email" element={<ForgotPasswordEmail />} />
        <Route path="/forgot-password-otp" element={<ForgotPasswordOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />

        <Route path="/unauthorized" element={<div>You are unauthorized! Get lost</div>} />

        <Route path="/payment-failure" element={<EsewaFailure />} />
        <Route path="/edit" element={<EditAvailability/>} />

        {/* ✅ Mentee protected routes */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment/success/:transaction_uuid?" element={<EsewaSuccess />} />
        <Route path="/payment/failure" element={<EsewaFailure />} />

        {/* ✅ Admin routes */}
        <Route path='/test-adminDashboard' element={<AdminLayout />}>
          <Route path='' element={<AdminDashboard />} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='mentors' element={<AdminMentors />} />
          <Route path='mentors/:mentorId' element={<AdminMentorProfile />} />
          <Route path='bookings' element={<AdminBookings />} />
          <Route path='reviews' element={<AdminReviews />} />
          <Route path='settings' element={<AdminSettings />} />
        </Route>

        {/* ✅ Mentee protected routes */}
        <Route element={<ProtectedRoutes allowedRoles={["MENTEE"]} />}>
          <Route path='/mentee' element={<MenteeLayout />}>
            <Route path='dashboard' element={<MenteeDashboard />} />
            <Route path='booking-request/:mentorId' element={<BookingRequest />} />
            <Route path='sessions/:userId' element={<MenteeSessions />} />
            <Route path='viewMentors' element={<MentorDirectory />} />
            <Route path='mentorProfile/:mentorId' element={<AdminMentorProfile isAdmin={false} />} />
            <Route path='calendar/:mentorId' element={<CalendarPreview />} />
            <Route path="checkout/:mentorId/:bookingId" element={<CheckoutPage />} />
            <Route path="payment-success" element={<EsewaSuccess />} />
            <Route path='menteeProfile' element={<MenteeProfile />} />
            <Route path='chat/:receiverId' element={<MenteeChat />} />
            <Route path='chat' element={<MenteeChat />} />
          </Route>
          <Route path='/mentee/registerDetails' element={<MenteeProfileStep />} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["MENTOR"]}/>}>
          <Route path='/mentor' element={<MentorLayout/>}>
            <Route path='dashboard' element={<MentorDashboard/>}/>
            <Route path='availability' element={<Availability/>}/>
            <Route path='profile' element={<MentorProfile />} />
            <Route path='chat/:receiverId' element={<MentorChat />} />
            <Route path='chat' element={<MentorChat/>} />
            <Route path="sessions/:userId" element={<MentorSessions/>} />
            <Route path="editAvailability" element= {<EditAvailability/>} />
          </Route>
          <Route path='/mentor/registerDetails' element={<MentorStepperForm/>}/>
          <Route path='/mentor/confirmation' element={<EmailConfirmationPage/>}/>
          <Route path='/mentor/declination' element={<DeclinedPage/>}/>
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["ADMIN"]} />}>
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='viewUsers' element={<AdminUsers />} />
            <Route path='viewMentors' element={<AdminMentors />} />
            <Route path='mentors/:mentorId' element={<AdminMentorProfile isAdmin={true} />} />
            <Route path='viewBookings' element={<AdminBookings />} />
            <Route path='reviews' element={<AdminReviews />} />
            <Route path='settings' element={<AdminSettings />} />
          </Route>
          <Route path="/admin/notify" element={<AdminNotifications/>} />
        </Route>


      </Routes>
    </Router>
  );
}

export default App;
