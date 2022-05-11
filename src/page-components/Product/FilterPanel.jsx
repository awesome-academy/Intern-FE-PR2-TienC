import React, { useState } from 'react'
import Rating from '@mui/material/Rating'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import classNames from 'classnames'
import qs from 'query-string'

export default function FilterPanel({ categories, filters }) {
  const navigate = useNavigate()
  const rating = [5, 4, 3, 2, 1]
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)

  const handleActiveOptionSort = value =>
    classNames({ activeCategory: value === filters.category })

  const handleClickCategory = id => {
    const _filters = {
      ...filters,
      category: id
    }
    navigate(path.home + `?${qs.stringify(_filters)}`)
  }

  const handleClickPrice = () => {
    if (minPrice && maxPrice > 0) {
      const _filters = {
        ...filters,
        price_min: minPrice,
        price_max: maxPrice
      }
      navigate(path.home + `?${qs.stringify(_filters)}`)
    }
  }

  const handleClickRating = rating => {
    const _filters = {
      ...filters,
      rating_filter: rating
    }
    navigate(path.home + `?${qs.stringify(_filters)}`)
  }

  const handleClickReset = () => {
    navigate(path.home)
  }
  return (
    <div className="flex flex-col">
      <div className="mt-4">
        <h6 className="font-semibold text-[17px] border-b border-gray-200 pb-3 mb-3">
          Tất cả danh mục
        </h6>
        <div className="pl-3 flex flex-col">
          <ul>
            {categories.map((item, index) => (
              <li
                onClick={() => handleClickCategory(item._id)}
                key={index}
                className={`mb-2 cursor-pointer ${handleActiveOptionSort(
                  item._id
                )}`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-7">
        <h6 className="font-semibold text-[17px] border-b border-gray-200 pb-3 mb-3">
          Bộ lọc tìm kiếm
        </h6>
        <div className="border-b border-gray-200 pb-6 mb-3">
          <span className="text-sm">Khoảng giá</span>
          <div className="flex flex-row gap-1 mt-2">
            <input
              type="text"
              placeholder="Từ"
              className="w-[80px] px-1 py-1 border-gray-300 border text-sm"
              onChange={e => setMinPrice(e.target.value)}
            />
            -
            <input
              type="text"
              placeholder="Đến"
              className="w-[80px] px-1 py-1 border-gray-300 border text-sm"
              onChange={e => setMaxPrice(e.target.value)}
            />
          </div>
          <button
            className="activeOptionSort mt-3 py-2 w-full"
            onClick={() => handleClickPrice()}
          >
            Áp dụng
          </button>
        </div>
        <div className="border-b border-gray-200 pb-6 mb-3">
          <span className="text-sm">Đánh giá</span>
          <div className="flex flex-col gap-2 mt-3">
            {rating.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm cursor-pointer"
                onClick={() => handleClickRating(item)}
              >
                <Rating
                  name="size-small"
                  value={item}
                  size="small"
                  readOnly
                />
                {index > 0 && 'trở lên'}
              </div>
            ))}
          </div>
        </div>
        <div>
          <button
            className="activeOptionSort mt-3 py-2 w-full"
            onClick={() => handleClickReset()}
          >
            Xóa tất cả
          </button>
        </div>
      </div>
    </div>
  )
}
