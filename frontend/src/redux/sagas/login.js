import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects'
import axios from 'axios';
import sha1 from 'sha1';
import get from 'lodash/get';
import * as actions from '../actions/login';
import * as authActions from '../actions/auth';
import * as api from '../../utils/axios';

const POST_TO_USERS = '/api/get_user';
const GET_TO_USERS = '/api/users';

function* checkUserData({ payload }) {
	try {
		const { email = '', password = '', id = '' } = payload;
		const configured = {
			email: email,
			password: sha1(password),
		};
		const { data } = id 
			? yield call(api.getData, `${GET_TO_USERS}/${id}`)
			: yield call(api.postData, POST_TO_USERS, configured);

		if (get(data, '_id')) {
			const { birthdate, name, photo, _id } = data;
			yield put(actions.checkCredentialsSuccess(data))
			yield put(authActions.userAuthSuccess({ birthdate, name, photo, _id }))
		} else {
			yield put(actions.checkCredentialsFailure())
			yield put(authActions.userAuthFailure('Аккаунт не обнаружен'))
		}
	} catch (error) {
		console.log('error.message', error.message);
		yield put(actions.checkCredentialsFailure(error.message))
		console.error(error);
	}
}

export default function* root() {
  yield takeEvery(actions.checkCredentialsRequest, checkUserData);
}