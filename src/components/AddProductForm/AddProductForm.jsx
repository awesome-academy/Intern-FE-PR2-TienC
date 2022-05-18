import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from 'src/components/InputField/InputField'
import Button from 'src/components/Button/Button'
import { unwrapResult } from '@reduxjs/toolkit'
import {
  addProduct,
  uploadImage
} from 'src/page-components/Admin/admin.slice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'

export default function AddProductForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const categories = useSelector(state => state.home.categories)
  const [categoryItem, setCategoryItem] = useState('')

  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên sản phẩm'),
    price: yup.string().required('Vui lòng nhập giá sản phẩm'),
    rating: yup.string().required('Vui lòng nhập rating'),
    sold: yup.string().required('Vui lòng nhập số lượng đã bán')
  })

  const form = useForm({
    defaultValues: {
      name: '',
      price: '',
      rating: '',
      sold: ''
    },
    resolver: yupResolver(schema)
  })

  const handleSubmit = async data => {
    //Upload Image
    let formData = new FormData()
    for (let i = 0; i < data.image.length; i++) {
      formData.append('images', data.image[i])
    }
    const resImg = await dispatch(
      uploadImage(formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    )
    const dataImg = unwrapResult(resImg)

    //ADD Product
    const dataAddProduct = {
      image: dataImg.data[0],
      price: data.price,
      rating: data.rating,
      sold: data.sold,
      name: data.name,
      category: categoryItem
    }
    try {
      const res = await dispatch(addProduct(dataAddProduct))
      unwrapResult(res)
      toast.success('Thêm sản phẩm thành công', {
        position: 'top-center',
        autoClose: 2000
      })
      navigate(path.admin + path.product)
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
          placeholder="Tên sản phẩm"
          form={form}
        />
      </div>
      <div className="">
        <InputField
          type="text"
          name="price"
          placeholder="Giá sản phẩm"
          form={form}
        />
      </div>
      <div className="">
        <InputField
          type="text"
          name="rating"
          placeholder="Rating"
          form={form}
        />
      </div>
      <div className="">
        <InputField
          type="text"
          name="sold"
          placeholder="Đã bán"
          form={form}
        />
      </div>
      <div className="">
        <select
          name="categories"
          className="mt-1 px-6 py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          onChange={e => setCategoryItem(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((item, index) => (
            <option value={item._id} key={index}>
              {item.name}
            </option>
          ))}
        </select>
        <span className="text-xs text-red-600 pl-2"></span>
      </div>
      <div className="">
        <input
          {...form.register('image')}
          name="image"
          type="file"
          accept=".jpg,.jpeg,.png"
          multiple
        />
      </div>
      <div className="flex items-center justify-center pt-5">
        <Button type="submit" text="Submit" />
      </div>
    </form>
  )
}
