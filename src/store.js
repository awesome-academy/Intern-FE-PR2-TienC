import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'src/pages/Auth/auth.slice'
import appReducer from 'src/app.slice'
import cartReducer from 'src/pages/DetailProduct/detailproduct.slice'
import homeReducer from 'src/pages/Home/home.slice'
import adminReducer from 'src/page-components/Admin/admin.slice'

const rootReducer = {
  app: appReducer,
  auth: authReducer,
  cart: cartReducer,
  home: homeReducer,
  admin: adminReducer
}
const store = configureStore({
  reducer: rootReducer
})
export default store
