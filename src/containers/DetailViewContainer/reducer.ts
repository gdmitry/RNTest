import { ACTION_TYPES, PictureDetailsAction } from "./actions";

const initialState = {
  hiResPictures: [],
  isLoading: false,
};

export default function (
  state: any = initialState,
  action: PictureDetailsAction
) {
  const payload = action.payload;

  switch (action.type) {
    case ACTION_TYPES.PICTURE_DETAILS_FETCH_REQUESTED:
      return { ...state, isLoading: true };
    case ACTION_TYPES.PICTURE_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        hiResPictures: [...state.hiResPictures, payload.hiResImage],
        isLoading: false,
      };
    case ACTION_TYPES.FETCH_FAILED:
      return { ...state, errorMessage: payload.errorMessage, isLoading: false };
    default:
      return state;
  }
}
