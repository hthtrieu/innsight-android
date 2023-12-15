import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: '',
    result: {},
    hotel: {},
    room: {},
    searchParams: {
        province: null,
        checkinDay: null,
        checkoutDay: null,
        count: null,
        adultCount: null,
        childrenCount: null,
        rate: null,
        fromPrice: null,
        toPrice: null,
        review: null,
        pageIndex: null,
        pageSize: null
    },
    cart: {
        hotel: null,
        rooms: [],
        totalPriceWithoutTax: null,
    }
}

const hotelSlice = createSlice({
    name: 'HOTEL',
    initialState,
    reducers: {
        result: (state, { payload }) => {
            state.result = payload
        },
        getHotel: (state, { payload }) => {
            state.hotel = payload
            state.cart = {
                hotel: null,
                rooms: [],
                totalPriceWithoutTax: null,
            }
        },
        setSearchParams: (state, { payload }) => {
            state.searchParams = {
                province: payload?.province,
                checkinDay: payload?.checkinDay,
                checkoutDay: payload?.checkoutDay,
                count: payload?.count,
                adultCount: payload?.adultCount,
                childrenCount: payload?.childrenCount,
                rate: payload?.rate,
                fromPrice: payload?.fromPrice,
                toPrice: payload?.toPrice,
                review: payload?.review,
                pageIndex: payload?.pageIndex,
                pageSize: payload?.pageSize
            }
        },
        addRoomToCart: (state, { payload }) => {
            const { hotel, room, count, onSuccess } = payload;
            const existingRoomIndex = state.cart.rooms.findIndex((r) => r?.id === room?.id);
            if (existingRoomIndex !== -1) {
                state.cart.rooms[existingRoomIndex].count = count;
            } else {
                state.cart = {
                    hotel: hotel,
                    rooms: [
                        ...state.cart.rooms,
                        {
                            ...room,
                            count: count,
                        },
                    ],
                };
            }
            onSuccess && onSuccess();
        },
    },

})


export const { result, getHotel, setSearchParams, addRoomToCart } = hotelSlice.actions

export default hotelSlice.reducer