import { RootState } from '../../types/store';

export const currentPage = (state: RootState) => state.homeReducer.page;
