import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import Pagination from '@mui/material/Pagination'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import useQuery from 'src/hooks/useQuery'
import ProductSkeleton from './ProductSkeleton'
import { useSelector } from 'react-redux'
import qs from 'query-string'
import classNames from 'classnames'

export default function SearchItemResult({ products, filters }) {
  const data = [
    {
      name: 'view',
      title: 'Phổ biến'
    },
    {
      name: 'createdAt',
      title: 'Mới nhất'
    },
    {
      name: 'sold',
      title: 'Bán chạy'
    }
  ]
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

  const sortBy = (sortBy, order) => {
    const _filters = { ...filters, sort_by: sortBy, order: order }
    navigate(path.home + `?${qs.stringify(_filters)}`)
  }

  const handleActiveOptionSort = value =>
    classNames({ activeOptionSort: value === filters.sort_by })

  return (
    <>
      <div className="flex gap-2 items-center p-4 bg-gray-200 mb-3">
        <label className="text-sm">Sắp xếp theo</label>
        {data.map((item, index) => (
          <button
            key={index}
            className={`px-3 py-2 bg-white text-black text-sm ${handleActiveOptionSort(
              item.name
            )}`}
            onClick={() => sortBy(item.name)}
          >
            {item.title}
          </button>
        ))}
        <select
          className={`px-3 py-2 bg-white text-black text-sm outline-green-600 ${handleActiveOptionSort(
            'price'
          )}`}
          onClick={e => sortBy(...e.target.value.split(':'))}
        >
          <option value="">Giá</option>
          <option value="price:asc">Giá: Thấp đến cao</option>
          <option value="price:desc">Giá: Cao đến thấp</option>
        </select>
      </div>
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
