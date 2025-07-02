import { combineReducers, configureStore } from '@reduxjs/toolkit';
import calendarSlice from './calendar-slice';

const rootReducer = combineReducers({ calendarSlice });
const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
