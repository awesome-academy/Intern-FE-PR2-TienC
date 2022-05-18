import { useSelector } from 'react-redux'

export function useAdminAuthenticated() {
  const role = useSelector(state => state.auth.profile.roles)
  if (role && role[0] === 'Admin') {
    return true
  }
  return false
}
