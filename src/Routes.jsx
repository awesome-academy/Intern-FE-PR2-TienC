import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { path } from './constants/path'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Home'

export default function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={path.home} element={<Home />}></Route>
        <Route path={path.register} element={<Register />}></Route>
        <Route path={path.login} element={<Login />}></Route>
        <Route path={path.notFound}></Route>
      </Routes>
    </BrowserRouter>
  )
}
