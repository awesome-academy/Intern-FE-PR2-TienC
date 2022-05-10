import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import Pagination from '@mui/material/Pagination'
import { useNavigate } from 'react-router-dom'
import { path } from '../../constants/path'
import useQuery from '../../hooks/useQuery'
import ProductSkeleton from './ProductSkeleton'
import { useSelector } from 'react-redux'

export default function SearchItemResult({ products }) {
  const { products: productList, pagination } = products
  const query = useQuery()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const loading = useSelector(state => state.app.loading)

  useEffect(() => {
    const { page } = query
    page && setPage(parseInt(page))
  }, [query])

  const handleChangePage = (event, value) => {
    setPage(value)
    navigate(path.home + `?page=${value}`)
  }
  return (
    <>
      {loading ? (
        <ProductSkeleton />
      ) : (
        productList && (
          <div className="flex flex-wrap">
            {productList.map(product => (
              <ProductItem key={product._id} {...product} />
            ))}
          </div>
        )
      )}
      <div className="flex justify-center mt-4">
        <Pagination
          count={pagination.page_size}
          page={page}
          onChange={handleChangePage}
          color="success"
        />
      </div>
    </>
  )
}
