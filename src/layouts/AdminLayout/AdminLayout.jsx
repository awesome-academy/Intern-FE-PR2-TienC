import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from 'src/page-components/Admin/Sidebar'
export default function AdminLayout() {
  return (
    <>
      <Sidebar />
      <div className="ml-[300px] mt-[100px] px-[30px]">
        <Outlet />
      </div>
    </>
  )
}
