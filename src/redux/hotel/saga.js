import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import { sample } from './slice';
function* watchSample() {
    yield takeEvery(actions.SAMPLE_ACTION, function* (payload) {
        const { onSuccess } = payload
        try {
            yield put(sample('Test redux'))
            onSuccess && onSuccess();
        } catch (error) {

        } finally {
        }
    });
}

export default function* HotelSaga() {
    yield all([
        fork(watchSample),
    ]);
}