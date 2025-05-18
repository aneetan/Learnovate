import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './pages/Login';
import RegistrationForm from './pages/RegistrationForm';
import Dashboard from './pages/Dashboard';
import MentorDashboard from './pages/MentorDashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path='/mentee/dashboard' element={<Dashboard/>}/>
        <Route path='/mentor/dashboard' element={<MentorDashboard/>}/>
        <Route path="/admin/dashboard" element={<div> This is admin </div>} />

      </Routes>
    </Router>
  )
}

export default App
