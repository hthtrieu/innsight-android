import { all } from 'redux-saga/effects'
import HotelSaga from './hotel/saga'
import BookingSaga from './booking/saga'
export default function* rootSaga() {
    yield all([
        HotelSaga(),
        BookingSaga(),
    ])
}