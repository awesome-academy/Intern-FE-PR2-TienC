import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { path } from 'src/constants/path'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import DetailProduct from 'src/pages/DetailProduct/DetailProduct'
import Login from 'src/pages/Auth/Login'
import Register from 'src/pages/Auth/Register'
import Home from 'src/pages/Home/Home'
import NotFound from 'src/pages/NotFound/NotFound'
import Cart from 'src/pages/Checkout/Cart'
import AuthenticatedGuard from 'src/guards/AuthenticatedGuard'
import UnauthenticatedGuard from 'src/guards/UnauthenticatedGuard'
import Payment from 'src/pages/Checkout/Payment'
import User from 'src/pages/User/User'
import Profile from 'src/pages/User/Profile'
import ResetPassword from 'src/pages/User/ResetPassword'
import Purchase from 'src/pages/User/Purchase'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'
import AdminAuthenticatedGuard from 'src/guards/AdminAuthenticatedGuard'
import Dashboard from 'src/page-components/Admin/Dashboard'
import UserAdmin from 'src/page-components/Admin/UserAdmin'
import Products from 'src/page-components/Admin/Products'
import Category from 'src/page-components/Admin/Category'
import Orders from 'src/page-components/Admin/Orders'

export default function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={path.home} element={<Home />} />
          <Route
            path={path.productDetail}
            element={<DetailProduct />}
          />
          <Route path={path.notFound} element={<NotFound />} />
          <Route element={<AuthenticatedGuard />}>
            <Route path={path.cart} element={<Cart />} />
            <Route path={path.payment} element={<Payment />} />
            <Route path={path.user} element={<User />}>
              <Route path="" element={<Profile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="password" element={<ResetPassword />} />
              <Route path="purchase" element={<Purchase />} />
            </Route>
          </Route>
        </Route>
        <Route element={<UnauthenticatedGuard />}>
          <Route path={path.register} element={<Register />} />
          <Route path={path.login} element={<Login />} />
        </Route>
        <Route element={<AdminAuthenticatedGuard />}>
          <Route path={path.admin} element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user" element={<UserAdmin />} />
            <Route path="product" element={<Products />} />
            <Route path="categories" element={<Category />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
