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
          <Route element={<AuthenticatedGuard />}>
            <Route path={path.cart} element={<Cart />} />
            <Route path={path.payment} element={<Payment />} />
          </Route>
          <Route path={path.notFound} element={<NotFound />} />
        </Route>
        <Route element={<UnauthenticatedGuard />}>
          <Route path={path.register} element={<Register />} />
          <Route path={path.login} element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
