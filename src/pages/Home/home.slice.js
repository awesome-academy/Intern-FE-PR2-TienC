import { createAsyncThunk } from '@reduxjs/toolkit'
import categoryApi from '../../api/category.api'
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
