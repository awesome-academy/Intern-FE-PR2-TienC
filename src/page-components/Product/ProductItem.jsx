import React from 'react'
import { Link } from 'react-router-dom'
import { path } from '../../constants/path'
import { formatMoney } from '../../utils/helper'
import Rating from '@mui/material/Rating'

export default function ProductItem({
  _id,
  image,
  name,
  sold,
  price,
  rating
}) {
  return (
    <div className="flex-[0_0_20%] max-w-[20%] px-[5px] my-[5px]">
      <Link
        to={path.product + `/${_id}`}
        className="inline-block bg-white shadow-product-item rounded-sm"
      >
        <img src={image} alt={name} className="w-full h-[204px]" />
        <div className="p-2 flex flex-col">
          <p className="line-clamp-2 break-words text-ellipsis text-xs mb-2">
            {name}
          </p>
          <span className="text-red-500 text-sm">
            đ{formatMoney(price)}
          </span>
          <div className="flex items-center justify-between ">
            <Rating
              name="size-small"
              value={rating}
              size="small"
              readOnly
            />
            <span className="text-[13px]">{sold} Đã bán</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
