import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from 'src/utils/helper'
import adminApi from 'src/api/admin.api'
import LocalStorage from 'src/constants/localStorage'

export const getAllUsers = createAsyncThunk(
  'admin/getUser',
  payloadCreator(adminApi.getAllUser)
)

export const uploadImage = createAsyncThunk(
  'admin/uploadImage',
  payloadCreator(adminApi.uploadImage)
)

export const addProduct = createAsyncThunk(
  'admin/addProduct',
  payloadCreator(adminApi.addProduct)
)

export const addCategory = createAsyncThunk(
  'admin/addCategory',
  payloadCreator(adminApi.addCategory)
)

export const getOrders = createAsyncThunk(
  'admin/getOrders',
  payloadCreator(adminApi.getOrders)
)

export const confirmOrder = createAsyncThunk(
  'admin/confirmOrder',
  payloadCreator(adminApi.confirmOrders)
)

const handleGetOrdersFulfilled = (state, action) => {
  state.orders = action.payload.data
  localStorage.setItem(
    LocalStorage.orders,
    JSON.stringify(state.orders)
  )
}

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    orders:
      JSON.parse(localStorage.getItem(LocalStorage.orders)) || []
  },
  extraReducers: {
    [getOrders.fulfilled]: handleGetOrdersFulfilled
  }
})

const { reducer } = adminSlice
export default reducer
