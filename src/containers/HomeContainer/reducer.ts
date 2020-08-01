import { ACTION_TYPES, PictureDetailsAction } from "./actions";

const initialState = {
  pictures: [],
  isLoading: true,
  page: 1,
  errorMessage: "",
};

type RootState = typeof initialState;

export default function (state: RootState, action: PictureDetailsAction) {
  const payload = action.payload;
  switch (action.type) {
    case ACTION_TYPES.PICTURES_FETCH_REQUESTED:
      return { ...state, isLoading: true };
    case ACTION_TYPES.PICTURES_FETCH_SUCCESS:
      return {
        ...state,
        ...payload,
        pictures:
          payload.page === 1
            ? payload.pictures
            : [...state.pictures, ...payload.pictures],
        isLoading: false,
      };
    case ACTION_TYPES.FETCH_FAILED:
      return { ...state, errorMessage: payload.errorMessage, isLoading: false };
    default:
      return state;
  }
}
