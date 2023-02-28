import {
  CHECK_CREDENTIALS_SUCCESS,
  CHECK_CREDENTIALS_REQUEST,
  CHECK_CREDENTIALS_FAILURE,
} from '../actions/login';

const initialState = {
  url: '',
  loading: false,
  error: false,
  data: []
};

const reducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case 'CHECK_CREDENTIALS_REQUEST':
			return {
				...state,
				isLoading: true
			}
		case 'CHECK_CREDENTIALS_SUCCESS':
			console.log('action', payload);
			return {
			  ...state,
			  isLoading: false,
			  data: payload
			}
		case 'CHECK_CREDENTIALS_FAILURE':
			return {
			  ...state,
			  isLoading: false,
			  error: payload,
			  data: []
			}
		default:
			return state
	}
}

export default reducer;