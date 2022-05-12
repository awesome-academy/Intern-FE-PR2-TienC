import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { path } from 'src/constants/path'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import DetailProduct from 'src/pages/DetailProduct/DetailProduct'
import Login from 'src/pages/Auth/Login'
import Register from 'src/pages/Auth/Register'
import Home from 'src/pages/Home/Home'
import NotFound from 'src/pages/NotFound/NotFound'

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
        </Route>
        <Route path={path.register} element={<Register />}></Route>
        <Route path={path.login} element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
