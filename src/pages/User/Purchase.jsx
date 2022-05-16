import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPurchaseOrdered } from '../DetailProduct/detailproduct.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { formatMoney } from '../../utils/helper'

export default function Purchase() {
  const dispatch = useDispatch()
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    const _getPurchase = async () => {
      const res = await dispatch(getPurchaseOrdered())
      const data = unwrapResult(res)
      setPurchases(data.data)
    }
    _getPurchase()
  }, [dispatch])
  return (
    <>
      {purchases.map((item, index) => (
        <div className="p-5 w-full mb-5 bg-white" key={index}>
          <div className="flex">
            <div className="flex gap-2 w-[85%]">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-[80px] h-[80px]"
              />
              <p className="text-sm">
                {item.product.name} x {item.buy_count}
              </p>
            </div>
            <div className="text-right w-[15%]">
              {formatMoney(item.price)}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <p>Tổng giá tiền: </p>
            <span className="text-[20px] text-green-500 font-semibold">
              {formatMoney(item.buy_count * item.price)}
            </span>
          </div>
        </div>
      ))}
    </>
  )
}
