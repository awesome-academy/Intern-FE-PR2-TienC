import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import { useDispatch, useSelector } from 'react-redux'
import Fade from '@mui/material/Fade'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { logout } from 'src/pages/Auth/auth.slice'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //toggle account
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleOpenMyAccount = () => {
    navigate(path.user)
    setAnchorEl(null)
  }
  const handleLogoutClick = () => {
    dispatch(logout())
    navigate(path.home)
  }

  const authenticated = useAuthenticated()
  const profile = useSelector(state => state.auth.profile)
  return (
    <>
      {authenticated ? (
        <div className="flex justify-end items-center">
          <div
            className="flex justify-end items-center gap-2 cursor-pointer"
            onClick={handleClick}
          >
            <img
              src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/2/28/1018487/EC9927B1-23C5-4B19-A.jpeg"
              alt="avatar"
              className="w-[30px] h-[30px] rounded-[50%] "
            />
            <span className="text-sm text-white">
              {profile.email}
            </span>
          </div>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button'
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleOpenMyAccount}>
              My Account
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>Log out</MenuItem>
          </Menu>
        </div>
      ) : (
        <div className="flex justify-end gap-4">
          <Link
            to={path.register}
            className="font-sm text-white hover:text-gray-200"
          >
            Đăng kí
          </Link>
          <Link
            to={path.login}
            className="font-sm text-white hover:text-gray-200"
          >
            Đăng nhập
          </Link>
        </div>
      )}
    </>
  )
}
