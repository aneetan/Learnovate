import { useState } from 'react'
import './App.css'
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

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<div> You are unauthorized! Get lost</div>} />


        <Route element={<ProtectedRoutes allowedRoles={["MENTEE"]}/>}>
          <Route path='/mentee' element={<MenteeLayout/>}>
            <Route path='/mentee/dashboard' element={<Dashboard/>}/>

          </Route>
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["ADMIN"]}/>}>
          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='/admin/dashboard' element={<div> This is admin </div>}/>
            
          </Route>
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["MENTOR"]}/>}>
          <Route path='/mentor' element={<MenteeLayout/>}>
            <Route path='/mentor/dashboard' element={<MentorDashboard/>}/>
        <Route path='/mentor/registerDetails' element={<MentorStepperForm/>}/>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
