import { all } from 'redux-saga/effects'
import HotelSaga from './hotel/saga'
export default function* rootSaga() {
    yield all([
        HotelSaga(),
    ])
}