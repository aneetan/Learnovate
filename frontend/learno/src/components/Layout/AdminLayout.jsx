import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
       Admin
        <Outlet/>
    </div>
  )
}

export default AdminLayout
