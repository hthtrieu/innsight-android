import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    reservation: {
    },
    checkIn: "",
    checkOut: "",
    bookingReserved: {},
    linkVnpay: "",
    invoice: {}
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setCheckInOut: (state, { payload }) => {
            const { checkIn, checkOut } = payload;
            state.checkIn = checkIn;
            state.checkOut = checkOut;
        },
        booking: (state, { payload }) => {
            state.bookingReserved = payload
        },
        saveReservation: (state, { payload }) => {
            const { onSuccess, reservation } = payload;
            state.reservation = reservation;
            onSuccess && onSuccess();
        },
        pay: (state, { payload }) => {
            // state.linkVnpay = payload
        },
        invoice: (state, { payload }) => {
            // state.invoice = payload
        },
    },
},)

export const { booking, addRoomToCart, setCheckInOut, saveReservation, pay, invoice } = bookingSlice.actions

export default bookingSlice.reducer