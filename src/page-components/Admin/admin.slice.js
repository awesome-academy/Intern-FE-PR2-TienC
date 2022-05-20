import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from 'src/utils/helper'
import adminApi from 'src/api/admin.api'
import { logout } from '../../pages/Auth/auth.slice'

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

export const getIncome = createAsyncThunk(
  'admin/getIncome',
  payloadCreator(adminApi.getIncome)
)

export const getTotalSales = createAsyncThunk(
  'admin/getSales',
  payloadCreator(adminApi.getTotalSales)
)

export const getTopCustomers = createAsyncThunk(
  'admin/getTopCustomers',
  payloadCreator(adminApi.getTopCustomers)
)

export const getIncomeByMonth = createAsyncThunk(
  'admin/getIncomeByMonth',
  payloadCreator(adminApi.getIncomeByMonth)
)

const handleGetOrdersFulfilled = (state, action) => {
  state.orders = action.payload.data
}

const handleGetIncomeFulfilled = (state, action) => {
  state.income = action.payload.data[0].totalSaleAmount
}

const handleGetTotalSalesFulfilled = (state, action) => {
  state.totalSales = action.payload.data
}

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    orders: [],
    income: 0,
    totalSales: []
  },
  extraReducers: {
    [getOrders.fulfilled]: handleGetOrdersFulfilled,
    [getIncome.fulfilled]: handleGetIncomeFulfilled,
    [getTotalSales.fulfilled]: handleGetTotalSalesFulfilled,
    [logout.fulfilled]: state => {
      state.orders = []
      state.income = 0
      state.totalSales = []
    }
  }
})

const { reducer } = adminSlice
export default reducer
