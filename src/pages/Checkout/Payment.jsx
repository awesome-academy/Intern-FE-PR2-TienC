import React from 'react'
import { Helmet } from 'react-helmet-async'
import PaymentIcon from '@mui/icons-material/Payment'
import { formatMoney } from '../../utils/helper'
import { useDispatch, useSelector } from 'react-redux'
import { buyPurchase } from './cart.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { getCartPurchase } from 'src/pages/DetailProduct/detailproduct.slice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { path } from '../../constants/path'

export default function Payment() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const commodityMoney = localStorage.getItem('total')
  const transpotFeeMoney = 0
  const totalMoney =
    parseInt(commodityMoney) + parseInt(transpotFeeMoney)
  const products = useSelector(state => state.cart.purchase)

  const handleClickBuy = async () => {
    const data = products.map(item => ({
      product_id: item.product._id,
      buy_count: item.buy_count
    }))
    await dispatch(buyPurchase(data)).then(unwrapResult)
    await dispatch(getCartPurchase()).then(unwrapResult)
    toast.success('Đặt đơn hàng thành công', {
      position: 'top-center',
      autoClose: 2000
    })
    navigate(path.home)
  }
  return (
    <>
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <div className="container mx-auto">
        <h1 className="text-[22px] font-semibold flex gap-3 items-center mb-4">
          <PaymentIcon />
          Thanh toán
        </h1>
        <div className="flex justify-between p-5 bg-white">
          <div>
            <h2 className="font-bold">Phương thức thanh toán</h2>
            <div className="mt-5">
              <span className="inline-block mr-5">
                Chọn hình thức thanh toán:
              </span>
              <input
                type="radio"
                id="payment"
                checked
                readOnly
                className="accent-green-500 inline mr-2"
              />
              <label htmlFor="payment">Tiền mặt</label>
            </div>
          </div>
          <div className="w-[320px]">
            <table className="w-full">
              <tr>
                <td>Tổng tiền hàng</td>
                <td>{formatMoney(commodityMoney)}</td>
              </tr>
              <tr>
                <td>Tổng tiền phí vận chuyển</td>
                <td>{formatMoney(transpotFeeMoney)}</td>
              </tr>
              <tr>
                <td className="font-bold">Tổng thanh toán</td>
                <td className="text-green-600 font-bold">
                  {formatMoney(totalMoney)}
                </td>
              </tr>
            </table>
            <button
              className="px-8 py-3 bg-green-500 text-white mt-5"
              onClick={handleClickBuy}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
