import { configureStore } from "@reduxjs/toolkit";
import petReducer from '../CreateSlice/petSlice'

export const store = configureStore({
    reducer :{
     pets:petReducer
    }
})