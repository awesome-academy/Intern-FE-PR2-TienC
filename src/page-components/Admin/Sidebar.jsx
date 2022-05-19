import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { path } from 'src/constants/path'

export default function Sidebar() {
  const data = [
    {
      path: 'dashboard',
      icon: 'bx bxs-dashboard',
      title: 'Dashboard'
    },
    {
      path: 'user',
      icon: 'bx bx-user',
      title: 'Users'
    },
    {
      path: 'product',
      icon: 'bx bx-package',
      title: 'Products'
    },
    {
      path: 'categories',
      icon: 'bx bxs-category-alt',
      title: 'Categories'
    },
    {
      path: 'orders',
      icon: 'bx bx-shopping-bag',
      title: 'Orders'
    }
  ]
  let activeStyle = {
    color: 'white',
    backgroundColor: 'green',
    fontWeight: 'bold'
  }
  return (
    <div className="h-screen fixed top-0 left-0 w-[300px] bg-white shadow-gray-300 shadow-lg flex flex-col items-center">
      <Link to={path.home}>
        <img
          src={require('src/assets/Logo.png')}
          alt="logo"
          className="h-[200px] w-[200px]"
        />
      </Link>
      <div className="flex flex-col items-start w-full px-3">
        {data.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
            className="w-full p-3 rounded-lg mb-4 font-semibold text-[18px] flex items-center gap-2"
          >
            <i className={item.icon} />
            {item.title}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
