import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import { SignIn, SignUp, LogOut } from '../../api/ApiAuth';
import { signin, logout } from './slice'
function* watchSignIn() {
    yield takeEvery(actions.SIGNIN, function* (payload) {
        const { data, onError, onSuccess } = payload
        try {
            const response = yield call(SignIn, data);
            yield put(signin({
                token: response?.Data?.access_token,
                id: response?.Data?.id,
                email: response?.Data?.email,
            }))
            onSuccess && onSuccess()

        } catch (error) {
            console.log(error)
            onError && onError();
        } finally {
        }
    });
}
function* watchSignUp() {
    yield takeEvery(actions.SIGN_UP, function* (payload) {
        const { data, onSuccess, onError } = payload
        console.log('sign up: ', data)
        try {
            const response = yield call(SignUp, data);
            if (response?.Data) {
                onSuccess && onSuccess();
            }

        } catch (error) {
            onError && onError();
        } finally {
        }
    });
}

function* watchLogOut() {
    yield takeEvery(actions.LOG_OUT, function* (payload) {
        const { token, onSuccess, onError } = payload
        try {
            const response = yield call(LogOut, token);
            yield put(logout())
            onSuccess && onSuccess();
        } catch (error) {
            onError && onError(error);
        } finally {
        }
    });
}

export default function* AuthSaga() {
    yield all([
        fork(watchSignIn),
        fork(watchSignUp),
        fork(watchLogOut),
    ]);
}