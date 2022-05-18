import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categoryApi from '../../api/category.api'
import LocalStorage from '../../constants/localStorage'
import { payloadCreator } from '../../utils/helper'
import { productApi } from './../../api/product.api'

export const getProduct = createAsyncThunk(
  'product/getProduct',
  payloadCreator(productApi.getProducts)
)

export const getCategory = createAsyncThunk(
  'category/get',
  payloadCreator(categoryApi.getCategories)
)

const handleGetCategoryFulFilled = (state, action) => {
  state.categories = action.payload.data
  localStorage.setItem(
    LocalStorage.categories,
    JSON.stringify(state.categories)
  )
}

const HomeSlice = createSlice({
  name: 'home',
  initialState: {
    categories:
      JSON.parse(localStorage.getItem(LocalStorage.categories)) || {}
  },
  extraReducers: {
    [getCategory.fulfilled]: handleGetCategoryFulFilled
  }
})

const { actions, reducer } = HomeSlice
export const { logout } = actions
export default reducer
