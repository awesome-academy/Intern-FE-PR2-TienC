import { Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import { Outlet } from 'react-router-dom'

export default function UnauthenticatedGuard() {
  const authenticated = useAuthenticated()

  if (authenticated) return <Navigate to={path.home} />
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}
