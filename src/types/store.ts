import { appStore } from '../App';
import rootReducer from '../store/rootReducer';

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof rootReducer>;