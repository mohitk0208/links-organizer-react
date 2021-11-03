import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'
import userReducer from '../slices/userSlice'
import notificationReducer from '../slices/globalNotificationSlice'
import categoriesReducer from '../slices/categoriesSlice'

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
    user: userReducer,
    categories: categoriesReducer,
  },
});
