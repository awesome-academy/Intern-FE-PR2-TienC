import React, { Fragment } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from 'src/constants/path'
import { useAdminAuthenticated } from 'src/hooks/useAdminAuthenticated'

export default function AdminAuthenticatedGuard() {
  const authenticated = useAdminAuthenticated()
  if (!authenticated) return <Navigate to={path.home} />
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}
