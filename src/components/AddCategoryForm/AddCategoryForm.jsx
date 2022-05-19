import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from 'src/components/InputField/InputField'
import Button from 'src/components/Button/Button'
import { unwrapResult } from '@reduxjs/toolkit'
import { addCategory } from '../../page-components/Admin/admin.slice'
import { toast } from 'react-toastify'
import { getCategory } from 'src/pages/Home/home.slice'

export default function AddCategoryForm() {
  const dispatch = useDispatch()

  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên category')
  })

  const form = useForm({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(schema)
  })

  const handleSubmit = async data => {
    const dataCategory = {
      name: data.name
    }
    try {
      const res = await dispatch(addCategory(dataCategory))
      unwrapResult(res)
      await dispatch(getCategory()).then(unwrapResult)
      toast.success('Thêm category thành công', {
        position: 'top-center',
        autoClose: 2000
      })
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
    <form
      className="pt-5 w-[500px]"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div className="">
        <InputField
          name="name"
          type="text"
          placeholder="Tên category"
          form={form}
        />
      </div>
      <div className="flex items-center justify-center pt-5">
        <Button type="submit" text="Submit" />
      </div>
    </form>
  )
}
