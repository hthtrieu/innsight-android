import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isLogin: false,
    token: "",
    id: "",
    email: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signin: (state, { payload }) => {
            state.isLogin = true;
            state.token = payload?.token;
            state.id = payload?.id;
            state.email = payload?.id;
        },
        logout: (state, { }) => {
            state.isLogin = false;
            state.token = "";
        },
    },

})

export const { signin, logout } = authSlice.actions

export default authSlice.reducer