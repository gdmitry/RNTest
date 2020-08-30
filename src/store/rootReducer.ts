import { combineReducers } from 'redux';
import homeReducer, {
  homePageState,
} from '../containers/HomeContainer/reducer';
import detailViewReducer, {
  detailViewState,
} from '../containers/DetailViewContainer/reducer';

export interface ApplicationState {
  homeReducer: homePageState;
  detailViewReducer: detailViewState;
}

export default combineReducers<ApplicationState>({
  homeReducer,
  detailViewReducer,
});
