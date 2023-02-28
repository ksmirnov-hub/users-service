import { all } from 'redux-saga/effects';

import personsSaga from './persons';
import registrationSaga from './registration';
import login from './login';

export default function* rootSaga() {
   yield all([
    personsSaga(),
    registrationSaga(),
    login(),
   ]);
}
