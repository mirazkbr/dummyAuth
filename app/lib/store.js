import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/authSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth: authSlice
    },
  })
}
