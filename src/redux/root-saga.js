import { all } from 'redux-saga/effects'
import HotelSaga from './hotel/saga'
import BookingSaga from './booking/saga'
import AuthSaga from './auth/saga'
import UserSaga from './user/saga'
export default function* rootSaga() {
    yield all([
        HotelSaga(),
        BookingSaga(),
        AuthSaga(),
        UserSaga(),
    ])
}