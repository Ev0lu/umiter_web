import isVisibleMenuReducer from './reducers/visibleMenuReducer'
import customProfileReducer from './reducers/customProfileReducer'
import userSettingsReducer from './reducers/userSettingsReducer';
import { configureStore } from '@reduxjs/toolkit'
import { userApi } from '@/shared/api/user';
import { terrariumApi } from '@/shared/api/terrarium';
import { authApi } from '@/shared/api';

export const store = configureStore({
  reducer: {
      visibleMenu: isVisibleMenuReducer,
      customProfile: customProfileReducer,
      userSettings: userSettingsReducer,
      [userApi.reducerPath]: userApi.reducer, 
      [terrariumApi.reducerPath]: terrariumApi.reducer, 
      [authApi.reducerPath]: authApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(terrariumApi.middleware)
        .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
