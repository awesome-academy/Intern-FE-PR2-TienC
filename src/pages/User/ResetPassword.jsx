import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import { useDispatch } from 'react-redux'
import { updateProfile } from './../Auth/auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export default function ResetPassword() {
  const dispatch = useDispatch()
  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Vui lòng nhập 6-20 kí tự')
      .max(20, 'Vui lòng nhập 6-20 kí tự'),
    newPassword: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Vui lòng nhập 6-20 kí tự')
      .max(20, 'Vui lòng nhập 6-20 kí tự'),
    confirmNewPassword: yup
      .string()
      .required('Vui lòng xác nhận lại mật khẩu')
      .oneOf([yup.ref('newPassword')], 'Xác nhận mật khẩu không đúng')
  })
  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    resolver: yupResolver(schema)
  })

  const handleSubmit = async data => {
    const body = {
      password: data.oldPassword,
      new_password: data.newPassword
    }
    try {
      await dispatch(updateProfile(body)).then(unwrapResult)
      toast.success('Thay đổi mật khẩu thành công', {
        position: 'top-center',
        autoClose: 2000
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="px-10 py-5 bg-white">
      <div className="mb-4 pb-4 border-b border-gray-200">
        <h1 className="capitalize text-[18px] font-semibold">
          Thay đổi mật khẩu
        </h1>
        <span className="text-sm text-gray-600">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho
          người khác
        </span>
      </div>
      <div>
        <form
          className="pt-5"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="mb-5 flex items-center">
            <div className="w-[15%] text-right">Mật khẩu cũ:</div>
            <div className="w-[85%] pl-5 flex flex-col">
              <InputField
                type="password"
                name="oldPassword"
                form={form}
                value={form.getValues('oldPassword')}
              />
            </div>
          </div>
          <div className="mb-5 flex items-center">
            <div className="w-[15%] text-right">Mật khẩu mới:</div>
            <div className="w-[85%] pl-5 flex flex-col">
              <InputField
                type="password"
                name="newPassword"
                form={form}
                value={form.getValues('newPassword')}
              />
            </div>
          </div>
          <div className="mb-5 flex items-center">
            <div className="w-[15%] text-right">
              Xác nhận mật khẩu mới:
            </div>
            <div className="w-[85%] pl-5 flex flex-col">
              <InputField
                type="password"
                name="confirmNewPassword"
                form={form}
                value={form.getValues('confirmNewPassword')}
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
