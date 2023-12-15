import { combineReducers } from 'redux';
import HotelReducer from "./hotel/slice"
import BookingReducer from "./booking/slice"
const rootReducer = combineReducers({
    Hotel: HotelReducer,
    Booking: BookingReducer,
});

export default rootReducer;