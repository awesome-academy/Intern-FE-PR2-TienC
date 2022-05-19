import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { confirmOrder, getOrders } from './admin.slice'
import { formatMoney } from 'src/utils/helper'

export default function Orders() {
  const thChildren = ['', 'name', 'Price', 'Date', 'Confirm']
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders()).then(unwrapResult)
  }, [dispatch])

  const ordersData = useSelector(state => state.admin.orders)

  const handleClickConfirm = async id => {
    await dispatch(confirmOrder(id)).then(unwrapResult)
    await dispatch(getOrders()).then(unwrapResult)
  }

  return (
    <>
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
          {ordersData.length &&
            ordersData.map((item, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {index + 1}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center line-clamp-1">
                    {item.user}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {formatMoney(item.totalPrice)}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {item.day}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-center">
                  {item.status === 1 ? (
                    <button
                      className="px-4 py-2 bg-green-500"
                      onClick={() =>
                        handleClickConfirm(item.purcharse_id)
                      }
                    >
                      Confirm
                    </button>
                  ) : (
                    <p className="text-gray-900 whitespace-no-wrap text-center italic">
                      <i className="bx bx-check" />
                      Confirmed
                    </p>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}
