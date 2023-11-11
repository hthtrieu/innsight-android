import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: 'halo'
}

const hotelSlice = createSlice({
    name: 'HOTEL',
    initialState,
    reducers: {
        sample: (state, { payload }) => {
            state.message = payload
        },
    },

})


export const { sample } = hotelSlice.actions

export default hotelSlice.reducer