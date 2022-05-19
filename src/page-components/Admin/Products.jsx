import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProduct } from 'src/pages/Home/home.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import useQuery from 'src/hooks/useQuery'
import { formatMoney } from 'src/utils/helper'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import Pagination from '@mui/material/Pagination'
import Button from 'src/components/Button/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import AddProductForm from 'src/components/AddProductForm/AddProductForm'

export default function Products() {
  const thChildren = ['', 'name', 'rating', 'sold', 'view', 'price']
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const query = useQuery()
  const [products, setProducts] = useState({
    products: [],
    pagination: {}
  })
  const [page, setPage] = useState(1)

  useEffect(() => {
    const { page } = query
    page && setPage(parseInt(page))
  }, [query])

  const handleChangePage = (event, value) => {
    setPage(value)
    navigate(path.admin + path.product + `?page=${value}`)
  }

  useEffect(() => {
    const params = {
      ...query,
      page: query.page || 1,
      limit: 10
    }
    const _getProducts = async () => {
      const res = await dispatch(getProduct({ params }))
      const data = unwrapResult(res)
      setProducts(data.data)
    }
    _getProducts()
  }, [dispatch, query])

  //Add Products
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-5 ">
        <h1 className="text-2xl font-semibold text-gray-700">
          Products
        </h1>
        <Button
          type="submit"
          text="ADD PRODUCT"
          onClick={handleClickOpen}
        ></Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Add Product'}
          </DialogTitle>
          <DialogContent>
            <AddProductForm />
          </DialogContent>
        </Dialog>
      </div>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            {thChildren.map((item, index) => (
              <th
                key={index}
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.products.length > 0 &&
            products.products.map((item, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {index + 1}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-left line-clamp-1">
                    {item.name}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {item.rating}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {item.sold}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {item.view}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {formatMoney(item.price)}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <Pagination
          count={products.pagination.page_size}
          page={page}
          onChange={handleChangePage}
          color="success"
        />
      </div>
    </>
  )
}
