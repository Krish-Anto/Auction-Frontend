import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    pets:[]
}

const petSlice = createSlice({
    name: "pets",
    initialState,
    reducers :{
        setPets:(state,action) => {
            state.pets = action.payload
        },

        updatePet : (state,action)=>{
            const{id,updatedPet} = action.payload;
            const index = state.pets.findIndex(pet =>pet.id === id);
            if(index !== -1){
                state.pets[index] = {...state.pets[index],...updatedPet}
            }
        }
    
    }
})

export const {setPets,updatePet} = petSlice.actions
export default petSlice.reducer