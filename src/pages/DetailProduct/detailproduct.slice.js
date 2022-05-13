import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productApi from 'src/api/product.api'
import { payloadCreator } from 'src/utils/helper'
import { purchaseApi } from 'src/api/purchase.api'
import { logout } from '../Auth/auth.slice'

export const getProductDetail = createAsyncThunk(
  'product/getDetail',
  payloadCreator(productApi.getDetailProduct)
)
export const addToCart = createAsyncThunk(
  'purchase/addToCart',
  payloadCreator(purchaseApi.addToCart)
)
export const getCartPurchase = createAsyncThunk(
  'purchase/getCart',
  payloadCreator(purchaseApi.getCartPurchase)
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    purchase: []
  },
  extraReducers: {
    [getCartPurchase.fulfilled]: (state, action) => {
      state.purchase = action.payload.data
    },
    [logout.fulfilled]: state => (state.purchase = [])
  }
})

const { reducer } = cartSlice
export default reducer
