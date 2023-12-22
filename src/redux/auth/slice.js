import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isLogin: false,
    token: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signin: (state, { payload }) => {
            state.isLogin = true;
            state.token = payload?.token
        },
        logout: (state, { }) => {
            state.isLogin = false;
            state.token = "";
        },
    },

})

export const { signin, logout } = authSlice.actions

export default authSlice.reducer