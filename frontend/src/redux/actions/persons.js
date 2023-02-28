import { createAction } from 'redux-actions'

export const PERSONS_FETCH_DATA_SUCCESS = 'PERSONS_FETCH_DATA_SUCCESS'
export const PERSONS_FETCH_DATA_REQUEST = 'PERSONS_FETCH_DATA_REQUEST'
export const PERSONS_FETCH_DATA_FAILURE = 'PERSONS_FETCH_DATA_FAILURE'


export const personsFetchDataSuccess = createAction(PERSONS_FETCH_DATA_SUCCESS)
export const personsFetchDataRequest = createAction(PERSONS_FETCH_DATA_REQUEST)
export const personsFetchDataFailure = createAction(PERSONS_FETCH_DATA_FAILURE)

