import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import { booking, pay, invoice, cancel } from './slice'
import { bookingApi, payment, reservationDetail, save_invoice, reservationCancel } from '../../api/ApiBooking';
function* watchBooking() {
    yield takeEvery(actions.BOOKING_START, function* (payload) {
        const { reservation, onError, onSuccess } = payload
        try {
            const response = yield call(bookingApi, reservation);
            if (response?.Data !== "") {
                if (response?.Data?.reservationCode) {
                    const response_2 = yield call(reservationDetail, { requestData: response?.Data?.reservationCode });
                    if (response_2?.Data) {
                        yield put(booking(response_2?.Data))
                        onSuccess && onSuccess();
                    }
                }
            }
        } catch (error) {
            onError && onError();
        } finally {
        }
    });
}

function* watchReservationDetail() {
    yield takeEvery(actions.RESERVATION_DETAIL, function* (payload) {
        const { requestData, onSuccess, onError } = payload
        try {
            const response = yield call(reservationDetail, { requestData: requestData });
            console.log(response)
            if (response?.Data) {
                yield put(booking(response?.Data))
                onSuccess && onSuccess();
            }
        } catch (error) {
            console.log(error)
            onError && onError();
        } finally {
        }
    });
}

function* watchPayment() {
    // yield takeEvery(actions.PAYMENT, function* (payload) {
    //     const { reservation, onError, onSuccess } = payload
    //     try {
    //         const response = yield call(payment, reservation);
    //         if (response?.Data !== "") {
    //             yield put(pay(response?.Data))
    //             onSuccess && onSuccess();
    //         }
    //     } catch (error) {
    //         onError && onError();
    //     } finally {
    //     }
    // });
}

function* watchSaveInvoice() {
    // yield takeEvery(actions.SAVE_INVOICE, function* (payload) {
    //     const { data, onError, onSuccess } = payload
    //     try {
    //         const response = yield call(save_invoice, data);
    //         if (response?.Data !== "") {
    //             yield put(invoice(response?.Data))
    //             onSuccess && onSuccess();
    //         }
    //     } catch (error) {
    //         onError && onError();
    //     } finally {
    //     }
    // });
}
function* watchReservationCancel() {
    yield takeEvery(actions.RESERVATION_CANCEL, function* (payload) {
        const { reservationCode, onSuccess, onError } = payload
        try {
            const response = yield call(reservationCancel, { reservationCode });
            if (response?.Data) {
                yield put(cancel(response?.Data))
                onSuccess && onSuccess();
            }
            else {
                onError && onError();
            }
        } catch (error) {
            onError && onError();
        } finally {
        }
    });
}
export default function* BookingSaga() {
    yield all([
        fork(watchBooking),
        fork(watchPayment),
        fork(watchReservationDetail),
        fork(watchSaveInvoice),
        fork(watchReservationCancel),
    ]);
}
