import {
	ADD_USER_DATA_SUCCESS,
	ADD_USER_DATA_REQUEST,
	ADD_USER_DATA_FAILURE,

	UPDATE_USER_DATA_SUCCESS,
	UPDATE_USER_DATA_REQUEST,
	UPDATE_USER_DATA_FAILURE,
} from '../actions/registration';

const initialState = {
  url: '',
  loading: false,
  error: false,
  userAdded: false,
  userModified: false
};

const reducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case 'ADD_USER_DATA_REQUEST':
			return {
				...state,
				isLoading: true
			}
		case 'ADD_USER_DATA_SUCCESS':
			console.log('action', payload);
			return {
			  ...state,
			  isLoading: false,
			  userAdded: true,
			}
		case 'ADD_USER_DATA_FAILURE':
			return {
			  ...state,
			  isLoading: false,
			  error: payload,
			  userAdded: false,
			}
		case 'UPDATE_USER_DATA_REQUEST':
			return {
				...state,
				isLoading: true
			}
		case 'UPDATE_USER_DATA_SUCCESS':
			return {
			  ...state,
			  isLoading: false,
			  userModified: true,
			}
		case 'UPDATE_USER_DATA_FAILURE':
			return {
			  ...state,
			  isLoading: false,
			  error: payload,
			  userModified: false,
			}
		case 'CLEAR_MESSAGE':
			return {
			  ...state,
			  userModified: false,
			}
		default:
			return state
	}
}

export default reducer;