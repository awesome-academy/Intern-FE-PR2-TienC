import { createAsyncThunk } from '@reduxjs/toolkit'
import { payloadCreator } from '../../utils/helper'
import { productApi } from './../../api/product.api'

export const getProduct = createAsyncThunk(
  'product/getProduct',
  payloadCreator(productApi.getProducts)
)
