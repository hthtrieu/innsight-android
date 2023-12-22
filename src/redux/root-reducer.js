import { combineReducers } from 'redux';
import HotelReducer from "./hotel/slice"
import BookingReducer from "./booking/slice"
import AuthReducer from './auth/slice'
const rootReducer = combineReducers({
    Hotel: HotelReducer,
    Booking: BookingReducer,
    Auth: AuthReducer,
});

export default rootReducer;