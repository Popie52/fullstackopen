import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterToggle(state, action) {
            return action.payload
        }
    }
})

export const {filterToggle} = filterSlice.actions;
export default filterSlice.reducer;