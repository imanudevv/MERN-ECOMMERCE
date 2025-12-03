import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/prouctSlice.js'

export const store=configureStore({
  reducer:{
    product:productReducer
  }
})