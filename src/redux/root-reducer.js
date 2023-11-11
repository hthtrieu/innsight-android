import { combineReducers } from 'redux';
import HotelReducer from "./hotel/slice"

const rootReducer = combineReducers({
    Hotel: HotelReducer,
});

export default rootReducer;