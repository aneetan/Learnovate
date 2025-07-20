import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
  return (
    <AdminSidebar>
      <Outlet />
    </AdminSidebar>
  )
}

export default AdminLayout
