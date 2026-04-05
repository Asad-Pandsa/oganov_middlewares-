import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import studentsReducer from '../features/students/studentsSlice';
import authReducer from '../features/auth/authSlice';
import { authMiddleware } from './authMiddleware';


export const store = configureStore({
    reducer: {
        ui: uiReducer,
        students: studentsReducer,
        auth: authReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)

});