import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import SearchItemResult from 'src/page-components/Product/SearchItemResult'
import { useDispatch } from 'react-redux'
import { getCategory, getProduct } from './home.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import useQuery from 'src/hooks/useQuery'
import FilterPanel from 'src/page-components/Product/FilterPanel'

export default function Home() {
  const dispatch = useDispatch()
  const query = useQuery()
  const [products, setProducts] = useState({
    products: [],
    pagination: {}
  })
  const [filters, setFilters] = useState({})
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const params = {
      ...query,
      page: query.page || 1,
      limit: 10,
      sort_by: query.sort_by || 'view'
    }
    setFilters(params)
    const _getProduct = async () => {
      const data = await dispatch(getProduct({ params }))
      const res = unwrapResult(data)
      setProducts(res.data)
    }
    _getProduct()
  }, [dispatch, query])

  useEffect(() => {
    dispatch(getCategory())
      .then(unwrapResult)
      .then(res => setCategories(res.data))
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <div className="container mx-auto flex">
        {/* Side */}
        <div className="flex flex-[0_0_190px] mr-[20px  ]">
          <FilterPanel categories={categories} filters={filters} />
        </div>
        {/* Main */}
        <div className="flex-1">
          <SearchItemResult products={products} filters={filters} />
        </div>
      </div>
    </>
  )
}
