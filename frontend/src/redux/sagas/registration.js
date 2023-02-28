import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects'
import axios from 'axios';
import sha1 from 'sha1';
import get from 'lodash/get';
import * as actions from '../actions/registration';
import * as authActions from '../actions/auth';
import * as api from '../../utils/axios';

const POST_TO_USERS = '/api/users';
const PUT_TO_USERS = '/api/users';

function* addUserData({ payload }) {
	try {
		const { birthdate, email, gender, name, password} = payload;
		const configured = {
			name: name,
			email: email,
			password: sha1(password),
			birthdate: birthdate,
			gender: gender,
			photo: get(payload, 'file[0]thumbUrl')
		};
		const { data } = yield call(api.postData, POST_TO_USERS, configured);
		if (get(data, '_id')) {
			const { birthdate, name, photo, _id } = data;
			yield put(actions.addUserDataSuccess())
			yield put(authActions.userAuthSuccess({ birthdate, name, photo, _id }))
		}
	} catch (error) {
		actions.addUserDataFailure(error.message)
		console.error(error);
	}
}

function* updateUserData({ payload }) {
	try {
		const {
			name,
			password,
			file,
			id
		} = payload;

		const { data } =  yield call(api.putData, `${PUT_TO_USERS}/${id}`, {
			name,
			password,
			photo: file
		})

		if (get(data, '_id')) {
			const { name, photo, _id } = data;
			yield put(actions.updateUserDataSuccess())
			yield put(authActions.userAuthSuccess({ name, photo, _id }))
		}

	} catch (error) {
		console.log('error.message', error.message);
		actions.updateUserDataFailure(error.message)
		console.error(error);
	}
}

export default function* root() {
  yield takeEvery(actions.addUserDataRequest, addUserData);
  yield takeEvery(actions.updateUserDataRequest, updateUserData);
}