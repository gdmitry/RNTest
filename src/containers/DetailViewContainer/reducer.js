// @flow
import { PICTURE_DETAILS_FETCH_REQUESTED, PICTURE_DETAILS_FETCH_SUCCESS } from './actions'
import { FETCH_FAILED } from '../HomeContainer/actions'

const initialState = {
  hiResPictures: [],
  isLoading: false,
}

export default function (state: any = initialState, action: Object) {
  const payload = action.payload

  switch (action.type) {
    case PICTURE_DETAILS_FETCH_REQUESTED:
      return { ...state, isLoading: true }
    case PICTURE_DETAILS_FETCH_SUCCESS:
      return { ...state, hiResPictures: [ ...state.hiResPictures, payload.hiResImage ], isLoading: false }
    case FETCH_FAILED:
      return { ...state, errorMessage: payload.errorMessage, isLoading: false }
    default:
      return state
  }
}
