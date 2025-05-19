import React from 'react'
import { Outlet } from 'react-router-dom'

const MenteeLayout = () => {
  return (
    <div>
       Mentee 
        <Outlet/>
    </div>
  )
}

export default MenteeLayout
