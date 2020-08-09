import { appStore } from "../App";
import { ApplicationState } from "../store/rootReducer";

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ApplicationState;
