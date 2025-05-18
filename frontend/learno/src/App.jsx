import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './pages/Login';
import RegistrationForm from './pages/RegistrationForm';
import Dashboard from './pages/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
