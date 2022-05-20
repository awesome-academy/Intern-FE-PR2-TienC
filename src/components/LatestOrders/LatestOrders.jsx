import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getOrders } from '../../page-components/Admin/admin.slice'
import { formatMoney } from '../../utils/helper'

export default function LatestOrders() {
  const dispatch = useDispatch()
  const [latestOrders, setLatestOrders] = useState([])
  const thChildren = ['users', 'total price', 'Date']

  useEffect(() => {
    const _getLatestOrders = async () => {
      const res = await dispatch(getOrders())
      const { data } = unwrapResult(res)
      setLatestOrders(data.slice(0, 5))
    }
    _getLatestOrders()
  }, [dispatch])

  return (
    <div className="p-[30px] flex flex-col justify-center bg-white rounded-2xl">
      <h2 className="text-[22px] mb-[20px] font-semibold text-gray-800 capitalize">
        Latest Orders
      </h2>
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
          {latestOrders.length &&
            latestOrders.map((item, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {item.user}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap line-clamp-1 text-center">
                    {formatMoney(item.totalPrice)}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap line-clamp-1 text-center">
                    {item.day}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
