import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'src/pages/Auth/auth.slice'
import appReducer from 'src/app.slice'
import cartReducer from 'src/pages/DetailProduct/detailproduct.slice'
const rootReducer = {
  app: appReducer,
  auth: authReducer,
  cart: cartReducer
}
const store = configureStore({
  reducer: rootReducer
})
export default store
