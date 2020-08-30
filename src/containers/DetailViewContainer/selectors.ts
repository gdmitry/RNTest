import { RootState } from '../../types/store';
import { HiResImage } from '../../types/api';

export const selectHiResImage = (state: RootState, imageId: string) =>
  state.detailViewReducer.hiResPictures.find(
    (hiResPic: HiResImage) => hiResPic.id === imageId
  );
