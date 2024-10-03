import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems:[]
}

const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers :{

    }
})

export const {addToCart} = itemSlice.actions
export default itemSlice.reducer