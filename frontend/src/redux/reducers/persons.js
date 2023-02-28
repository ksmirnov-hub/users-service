import {
  PERSONS_FETCH_DATA_SUCCESS,
  PERSONS_FETCH_DATA_REQUEST,
  PERSONS_FETCH_DATA_FAILURE,
} from '../actions/persons';

const initialState = {
  url: '',
  loading: false,
  error: false,
  data: []
};

const reducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case 'PERSONS_FETCH_DATA_REQUEST':
			return {
				...state,
				loading: true
			}
		case 'PERSONS_FETCH_DATA_SUCCESS':
			console.log('action', payload);
			return {
			  ...state,
			  loading: false,
			  data: payload
			}
		case 'PERSONS_FETCH_DATA_FAILURE':
			return {
			  ...state,
			  loading: false,
			  error: payload,
			  data: []
			}
		default:
			return state
	}
}

export default reducer;