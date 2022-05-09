import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'src/pages/Auth/auth.slice'

const rootReducer = {
  auth: authReducer
}
const store = configureStore({
  reducer: rootReducer
})
export default store
