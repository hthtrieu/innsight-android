import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import { result, getHotel, setSearchParams } from './slice';
import { searchHotels, getHotelById } from '../../api/ApiHotel'
function* watchSearch() {
    yield takeEvery(actions.SEARCH_HOTELS_START, function* (payload) {
        const { onSuccess, startDay, endDay, rooms, adults, children, province, onError, rate, fromPrice, toPrice, review, pageIndex, pageSize } = payload
        const data = {
            province: province,
            checkinDay: startDay,
            checkoutDay: endDay,
            count: rooms,
            adultCount: adults,
            childrenCount: children,
            rate: rate,
            fromPrice: fromPrice,
            toPrice: toPrice,
            review: review,
            pageIndex: pageIndex,
            pageSize: pageSize
        }


        try {
            yield put(setSearchParams(data))
            const response = yield call(searchHotels, data);
            yield put(result(response?.Data))
            onSuccess && onSuccess();

        } catch (error) {

        } finally {
        }
    });
}
function* watchGetHotel() {
    yield takeEvery(actions.GET_HOTEL, function* (payload) {
        const { hotelId, checkInDay, checkOutDay, onSuccess, onError } = payload
        try {
            const response = yield call(getHotelById, { hotelId: hotelId, checkInDay: checkInDay, checkOutDay: checkOutDay });


            if (response?.Data) {
                yield put(getHotel(response?.Data))
                onSuccess && onSuccess();
            }

        } catch (error) {
            onError && onError();
        } finally {
        }
    });
}
export default function* HotelSaga() {
    yield all([
        fork(watchSearch),
        fork(watchGetHotel),
    ]);
}