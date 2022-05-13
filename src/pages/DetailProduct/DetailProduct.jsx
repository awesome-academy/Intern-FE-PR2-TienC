import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductDetail } from './detailproduct.slice'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Rating from '@mui/material/Rating'
import { formatMoney } from '../../utils/helper'
import { Helmet } from 'react-helmet-async'
import DOMPurify from 'dompurify'

export default function DetailProduct() {
  const { idProduct } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const _getDetailProduct = async () => {
      const res = await dispatch(getProductDetail(idProduct))
      const data = unwrapResult(res)
      setProduct(data.data)
    }
    _getDetailProduct()
  }, [idProduct, dispatch])

  return (
    product && (
      <div className="container mx-auto">
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
        <div className="flex bg-white p-4">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <img src={product.image} alt={product.name} />
              </Grid>
              <Grid item xs={7}>
                <h2 className="text-xl mb-3 font-medium">
                  {product.name}
                </h2>
                <div className="flex items-center mb-3">
                  <div className="flex flex-row gap-1 items-center mr-3 pr-3 border-r border-gray-200">
                    <span className="text-green-600 underline font-medium text-[18px]">
                      {product.rating}
                    </span>
                    <Rating
                      name="size-small"
                      value={product.rating || 0}
                      size="small"
                      readOnly
                    />
                  </div>
                  <div className="font-medium">
                    {product.sold}
                    <span className="font-normal text-gray-500">
                      {' '}
                      đã bán
                    </span>
                  </div>
                </div>
                <div className="bg-gray-100 px-5 py-4 text-green-500 font-semibold text-[24px] mb-3">
                  đ{formatMoney(product.price)}
                </div>
                <div className="flex items-center text-gray-500 mb-3">
                  <span className="inline-block mr-5">Số lượng</span>
                  <button
                    className="px-3 py-1 border border-gray-200"
                    onClick={() => {
                      quantity > 1 && setQuantity(quantity - 1)
                    }}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    className="w-[40px] px-3 py-1 border border-gray-200"
                  />
                  <button
                    className="px-3 py-1 border border-gray-200"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div>
                  <button className="px-3 py-2 border border-green-600 bg-green-100 text-green-600">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
        <div className="bg-white p-6 mt-4 mb-8">
          <h2 className="text-2xl bg-gray-100 p-2 font-light">
            Mô tả sản phẩm
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description)
            }}
            className="mt-4 leading-8 text-sm text-gray-500"
          />
        </div>
      </div>
    )
  )
}
