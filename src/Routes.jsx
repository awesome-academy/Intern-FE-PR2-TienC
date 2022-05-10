import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { path } from './constants/path'
import MainLayout from './layouts/MainLayout/MainLayout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'

export default function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={path.home} element={<Home />} />
          <Route path={path.notFound} element={<NotFound />} />
        </Route>
        <Route path={path.register} element={<Register />}></Route>
        <Route path={path.login} element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
