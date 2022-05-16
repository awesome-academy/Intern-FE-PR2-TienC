import { createAsyncThunk } from '@reduxjs/toolkit'
import { purchaseApi } from 'src/api/purchase.api'
import { payloadCreator } from 'src/utils/helper'

export const updatePurchase = createAsyncThunk(
  'purchase/update',
  payloadCreator(purchaseApi.updatePurchase)
)
export const deletePurchase = createAsyncThunk(
  'purchase/delete',
  payloadCreator(purchaseApi.deletePurchase)
)
export const buyPurchase = createAsyncThunk(
  'purchase/buy',
  payloadCreator(purchaseApi.buyPurchase)
)
