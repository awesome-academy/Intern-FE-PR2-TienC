import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import Navbar from './Navbar'

export default function Header() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="w-full bg-gradient-to-r from-emerald-400 to-teal-400">
      <div className="container mx-auto pt-2 pb-1">
        <Navbar />
        <div className="flex items-center justify-between">
          <Link to={path.home} className="w-[70px] mr-5">
            <img
              src={require('src/assets/Logo.png')}
              alt="logo"
              className="h-[60px]"
            />
          </Link>
          <div className="grow">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  className="h-5 w-5 fill-slate-300"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Tìm kiếm sản phẩm..."
                type="text"
                name="search"
                onChange={e => setSearchValue(e.target.value)}
              />
            </label>
          </div>
          <Link to="" className="relative inline-block p-3">
            <svg
              viewBox="0 0 26.6 25.6"
              className="shopee-svg-icon navbar__link-icon icon-shopping-cart-2 text-white fill-white stroke-white w-[26px] h-[26px] mx-5"
            >
              <polyline
                fill="none"
                points="2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth="2.5"
              />
              <circle cx="10.7" cy={23} r="2.2" stroke="none" />
              <circle cx="19.7" cy={23} r="2.2" stroke="none" />
            </svg>
            <span className="flex items-center justify-center text-xs font-semibold absolute top-[2px] right-[15px] rounded-[50%] w-[25px] h-[25px] text-white bg-green-500">
              1
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
