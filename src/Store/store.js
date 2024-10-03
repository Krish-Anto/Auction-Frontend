import { configureStore } from "@reduxjs/toolkit";
import itemReducer from '../CreateSlice/itemSlice'

export const store = configureStore({
    reducer :{
     petAuctionm:itemReducer
    }
})