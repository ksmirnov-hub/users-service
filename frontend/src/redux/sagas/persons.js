import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects'
import axios from 'axios';
import * as actions from '../actions/persons';
import * as api from '../../utils/axios';

function* getAllPersons({ payload }) {
	try {
		console.log('url', payload);
		const response = yield call(api.getData, payload);
		console.log('response', response);
		if (response) {
			yield put(actions.personsFetchDataSuccess(response.data))
		}
	} catch (error) {
		actions.personsFetchDataFailure(error.message)
		console.error(error);
	}
}

export default function* root() {
  yield takeEvery(actions.personsFetchDataRequest, getAllPersons);
}