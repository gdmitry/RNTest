// @flow
import { PICTURES_FETCH_REQUESTED, FETCH_FAILED, PICTURES_FETCH_SUCCESS } from './actions'

const initialState = {
  pictures: [],
  isLoading: true,
  page: 1,
  errorMessage: '',
}

export default function (state: any = initialState, action: Object) {
  const payload = action.payload

  switch (action.type) {
    case PICTURES_FETCH_REQUESTED:
      return { ...state, isLoading: true }
    case PICTURES_FETCH_SUCCESS:
      return {
        ...state,
        ...payload,
        pictures:
          payload.page === 1
            ? payload.pictures
            : [...state.pictures, ...payload.pictures],
        isLoading: false,
      }
    case FETCH_FAILED:
      return { ...state, errorMessage: payload.errorMessage, isLoading: false }
    default:
      return state
  }
}
