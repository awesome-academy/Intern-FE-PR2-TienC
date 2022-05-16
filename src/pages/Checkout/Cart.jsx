import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { getCartPurchase } from '../DetailProduct/detailproduct.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { formatMoney } from '../../utils/helper'
import { updatePurchase, deletePurchase } from './cart.slice'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import { totalMoney } from './../../utils/helper'

export default function Cart() {
  const thChildren = [
    'sản phẩm',
    'đơn giá',
    'số lượng',
    'số tiền',
    'thao tác'
  ]
  const cartPurchase = useSelector(state => state.cart.purchase)
  const dispatch = useDispatch()
  const [cartItem, setCartItem] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setCartItem(cartPurchase)
    const total = totalMoney(cartItem)
    localStorage.setItem('total', total)
    setTotalPrice(total)
  }, [cartPurchase, cartItem])

  const handleUpdatePurchase = async (id, buyCount) => {
    const data = {
      product_id: id,
      buy_count: buyCount
    }
    await dispatch(updatePurchase(data)).then(unwrapResult)
    await dispatch(getCartPurchase()).then(unwrapResult)
  }

  const handleDeletePurchase = async id => {
    await dispatch(deletePurchase([id])).then(unwrapResult)
    await dispatch(getCartPurchase()).then(unwrapResult)
  }

  return (
    <>
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <div className="container mx-auto">
        <h1 className="text-[22px] font-semibold flex gap-3 items-center mb-4">
          <ShoppingCartIcon />
          Giỏ hàng
        </h1>
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
            {cartItem.length > 0 &&
              cartItem.map((item, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 hidden sm:table-cell">
                        <img
                          className="w-full h-full"
                          src={item.product.image}
                          alt={item.product.name}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap line-clamp-1">
                          {item.product.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-center">
                      {formatMoney(item.price)}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="text-gray-900 whitespace-no-wrap text-center">
                      <button
                        className="px-3 py-1 border border-gray-200"
                        onClick={() =>
                          item.buy_count > 1 &&
                          handleUpdatePurchase(
                            item.product._id,
                            parseInt(item.buy_count) - 1
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.buy_count}
                        className="w-[40px] px-2 py-1 border border-gray-200"
                        readOnly
                      />
                      <button
                        className="px-3 py-1 border border-gray-200"
                        onClick={() =>
                          handleUpdatePurchase(
                            item.product._id,
                            parseInt(item.buy_count) + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-center">
                      {formatMoney(
                        parseInt(item.price) *
                          parseInt(item.buy_count)
                      )}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <button
                      className="hover:text-green-500"
                      onClick={() => handleDeletePurchase(item._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="w-full p-4 bg-white flex justify-end mt-3 items-center gap-5">
          <p>Tổng thanh toán:</p>
          <span className="text-green-500 text-[20px]">
            {formatMoney(totalPrice)}
          </span>
          <Link
            to={path.payment}
            className="px-8 py-3 bg-green-500 text-white"
          >
            Mua hàng
          </Link>
        </div>
      </div>
    </>
  )
}
