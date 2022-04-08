import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'
import userReducer from '../slices/userSlice'
import notificationReducer from '../slices/globalNotificationSlice'
import categoriesReducer from '../slices/categoriesSlice'
import linksReducer from '../slices/linksSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
    user: userReducer,
    categories: categoriesReducer,
    links: linksReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store