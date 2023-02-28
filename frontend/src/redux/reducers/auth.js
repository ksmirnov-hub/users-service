import {
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  USER_AUTH_REQUEST,
  ERASE_USER_AUTH,
} from '../actions/auth';

const initialState = {
  loading: false,
  error: false,
  isAuth: false,
  profile: {},
};

const reducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case 'USER_AUTH_REQUEST':
			return {
				...state,
				loading: true
			}
		case 'USER_AUTH_SUCCESS':
			const { _id } = payload;
			localStorage.setItem('token', JSON.stringify(_id));
			return {
				...state,
				loading: false,
				isAuth: true,
				profile: { ...state.profile, ...payload},
			}
		case 'USER_AUTH_FAILURE':
			return {
				...state,
				loading: false,
				error: payload,
				isAuth: false,
				profile: {}
			}
		case 'ERASE_USER_AUTH':
			localStorage.removeItem('token');
			return {
				...state,
				loading: false,
				error: null,
				isAuth: false,
				profile: {}
			}
		default:
			return state
	}
}

export default reducer;