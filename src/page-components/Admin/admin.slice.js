import { createAsyncThunk } from '@reduxjs/toolkit'
import { payloadCreator } from 'src/utils/helper'
import adminApi from 'src/api/admin.api'

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
