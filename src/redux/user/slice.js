import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogin: true,
    userProfile: {},
    isPasswordChanged: false,
    isUpdateProfile: false,
    error: null,
    userHistoryReservations: {},

};

const userSlice = createSlice({
    name: 'USER',
    initialState,
    reducers: {
        changePasswordSuccess: (state) => {
            state.isPasswordChanged = true;
            state.error = null;
        },
        changePasswordFailure: (state, { payload }) => {
            state.isPasswordChanged = false;
            state.error = payload;
        },
        resetPasswordChangeStatus: (state) => {
            state.isPasswordChanged = false;
        },
        getProfile: (state, { payload }) => {
            state.userProfile = payload
        },
        updateProfileSuccess: (state) => {
            state.isUpdateProfile = true;
            state.error = null;
        },
        updateProfileFailure: (state, { payload }) => {
            state.isUpdateProfile = false;
            state.error = payload;
        },
        getHistoryReservations: (state, { payload }) => {
            state.userHistoryReservations = payload
        },
    },
});

export const {
    changePasswordSuccess,
    changePasswordFailure,
    resetPasswordChangeStatus,
    getProfile,
    updateProfileSuccess,
    updateProfileFailure,
    getHistoryReservations,
} = userSlice.actions;

export default userSlice.reducer;
