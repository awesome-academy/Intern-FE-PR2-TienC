import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import PasswordIcon from '@mui/icons-material/Password'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import { NavLink, Outlet } from 'react-router-dom'
import { path } from '../../constants/path'

export default function User() {
  let activeStyle = {
    color: 'green',
    fontWeight: 'bold'
  }
  return (
    <div className="container mx-auto flex">
      <div className="flex-[0_0_190px] flex flex-col gap-4 mr-[50px]">
        <NavLink
          style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }
          to={path.user + path.profile}
          className="flex items-center gap-2"
        >
          <PersonIcon color="success" />
          Thông tin cá nhân
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }
          to={path.user + path.password}
          className="flex items-center gap-2"
        >
          <PasswordIcon color="success" />
          Đổi mật khẩu
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }
          to={path.user + path.purchase}
          className="flex items-center gap-2"
        >
          <CardGiftcardIcon color="success" />
          Đơn mua
        </NavLink>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
