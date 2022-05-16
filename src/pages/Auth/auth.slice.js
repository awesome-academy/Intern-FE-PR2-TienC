import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from 'src/api/auth.api'
import { payloadCreator } from 'src/utils/helper'
import LocalStorage from '../../constants/localStorage'
import { userApi } from './../../api/user.api'

export const register = createAsyncThunk(
  'auth/register',
  payloadCreator(authApi.register)
)
export const login = createAsyncThunk(
  'auth/login',
  payloadCreator(authApi.login)
)
export const updateProfile = createAsyncThunk(
  'auth/update',
  payloadCreator(userApi.updateProfile)
)

const handleAuthFulfilled = (state, action) => {
  const { user, access_token } = action.payload.data
  state.profile = user
  localStorage.setItem(
    LocalStorage.user,
    JSON.stringify(state.profile)
  )
  localStorage.setItem(LocalStorage.accessToken, access_token)
}

const handleUpdateProfileFulfilled = (state, action) => {
  state.profile = action.payload.data
  localStorage.setItem(
    LocalStorage.user,
    JSON.stringify(state.profile)
  )
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    profile: JSON.parse(localStorage.getItem(LocalStorage.user)) || {}
  },
  reducers: {
    logout(state) {
      localStorage.removeItem(LocalStorage.user)
      localStorage.removeItem(LocalStorage.accessToken)
      state.profile = {}
    }
  },
  extraReducers: {
    [register.fulfilled]: handleAuthFulfilled,
    [login.fulfilled]: handleAuthFulfilled,
    [updateProfile.fulfilled]: handleUpdateProfileFulfilled
  }
})

const { actions, reducer } = authSlice
export const { logout } = actions
export default reducer
