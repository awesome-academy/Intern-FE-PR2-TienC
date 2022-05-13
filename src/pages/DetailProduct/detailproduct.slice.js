import { createAsyncThunk } from '@reduxjs/toolkit'
import productApi from 'src/api/product.api'
import { payloadCreator } from 'src/utils/helper'

export const getProductDetail = createAsyncThunk(
  'product/getDetail',
  payloadCreator(productApi.getDetailProduct)
)
