import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user =  useSelector((state) => state.user.user)

  return (
    <div>
      Mentee Dashboard
      Welcome, {user.name} ({user.role})!
    </div>
  )
}

export default Dashboard
