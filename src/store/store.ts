import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import authReducer from "./services/Slices/authSlice";

// 1. Combine slices
const rootReducer = combineReducers({
  auth: authReducer,
});

// 2. Persist config — whitelist auth so role + userInfo survive refresh
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// 3. Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Persistor
export const persistor = persistStore(store);

// add to store.ts, after persistor is created
store.subscribe(() => {
  const state = store.getState();
  window.HOST_USER_INFO = state.auth.userInfo;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;