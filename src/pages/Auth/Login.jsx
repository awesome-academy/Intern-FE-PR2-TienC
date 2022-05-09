import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import InputField from 'src/components/InputField/InputField'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { login } from './auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import Button from 'src/components/Button/Button'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Vui lòng nhập địa chỉ email')
      .email('Vui lòng nhập email hợp lệ'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Vui lòng nhập 6-20 kí tự')
      .max(20, 'Vui lòng nhập 6-20 kí tự')
  })
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const handleSubmit = async data => {
    try {
      const res = await dispatch(login(data))
      unwrapResult(res)
      navigate(path.home)
    } catch (error) {
      if (error.status === 422) {
        for (const key in error.data) {
          form.setError(key, {
            type: 'server',
            message: error.data[key]
          })
        }
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <div className="h-screen bg-green-400 w-full flex items-center justify-center">
        <div className="w-[500px] bg-white rounded-xl shadow-slate-300 p-12">
          <h1 className="text-green-400 text-2xl uppercase text-center font-semibold">
            Đăng nhập
          </h1>
          <form
            className="pt-5"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="mb-1">
              <InputField
                name="email"
                type="email"
                placeholder="Email"
                form={form}
              />
            </div>
            <div className="mb-1">
              <InputField
                type="password"
                name="password"
                placeholder="Mật khẩu"
                form={form}
              />
            </div>
            <div className="flex items-center justify-center pt-5">
              <Button type="submit" text="Đăng nhập" />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
