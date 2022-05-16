import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from './../Auth/auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export default function Profile() {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.auth.profile)
  const schema = yup.object().shape({
    phone: yup
      .string()
      .min(10, 'Số điện thoại gồm 10 chữ số')
      .max(10, 'Số điện thoại gồm 10 chữ số')
  })
  const form = useForm({
    defaultValues: {
      name: profile.name || '',
      phone: profile.phone || '',
      address: profile.address || ''
    },
    resolver: yupResolver(schema)
  })

  const handleSubmit = async data => {
    const body = {
      name: data.name,
      phone: data.phone,
      address: data.address
    }
    try {
      const res = await dispatch(updateProfile(body)).then(
        unwrapResult
      )
      toast.success('Cập nhật thông tin cá nhân thành công', {
        position: 'top-center',
        autoClose: 2000
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="px-10 py-5 bg-white">
      <div className="mb-4 pb-4 border-b border-gray-200">
        <h1 className="capitalize text-[18px] font-semibold">
          Hồ sơ của tôi
        </h1>
        <span className="text-sm text-gray-600">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </span>
      </div>
      <div>
        <form
          className="pt-5"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="mb-5 flex items-center">
            <div className="w-[15%] text-right">Email:</div>
            <div className="w-[85%] pl-5">{profile.email}</div>
          </div>
          <div className="mb-5 flex items-center">
            <div className="w-[15%] text-right">Họ và tên:</div>
            <div className="w-[85%] pl-5 flex items-center">
              <InputField
                type="text"
                name="name"
                form={form}
                value={form.getValues('name')}
              />
            </div>
          </div>
          <div className="mb-5 flex items-center">
            <div className="w-[15%] text-right">Số điện thoại:</div>
            <div className="w-[85%] pl-5 flex items-center">
              <InputField
                type="text"
                name="phone"
                form={form}
                value={form.getValues('phone')}
              />
            </div>
          </div>
          <div className="mb-5 flex items-center">
            <div className="w-[15%] text-right">Địa chỉ:</div>
            <div className="w-[85%] pl-5 flex items-center">
              <InputField
                type="text"
                name="address"
                form={form}
                value={form.getValues('address')}
              />
            </div>
          </div>
          <div className="flex items-center justify-center pt-5">
            <Button type="submit" text="Cập nhật" />
          </div>
        </form>
      </div>
    </div>
  )
}
