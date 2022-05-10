import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import SearchItemResult from 'src/page-components/Product/SearchItemResult'
import { useDispatch } from 'react-redux'
import { getProduct } from './home.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import useQuery from '../../hooks/useQuery'

export default function Home() {
  const dispatch = useDispatch()
  const query = useQuery()
  const [products, setProducts] = useState({
    products: [],
    pagination: {}
  })

  useEffect(() => {
    const params = {
      ...query,
      page: query.page || 1,
      limit: 10
    }
    const _getProduct = async () => {
      const data = await dispatch(getProduct({ params }))
      const res = unwrapResult(data)
      setProducts(res.data)
    }
    _getProduct()
  }, [dispatch, query])
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <div className="container mx-auto flex">
        {/* Side */}
        <div className="flex flex-[0_0_190px] mr-[20px]">
          This is sidebar filters
        </div>

        {/* Main */}
        <div className="flex-1">
          <SearchItemResult products={products} />
        </div>
      </div>
    </>
  )
}
