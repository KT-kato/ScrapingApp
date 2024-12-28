import { configureStore } from "@reduxjs/toolkit";
import ebayReducer from "./ebaySlices";
import sessionReducer from "./sessionSlices";

import type { ThunkAction, Action } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as rawUserSelector,
  useDispatch as rawUseDispatch,
} from "react-redux";

export const store = configureStore({
  reducer: {
    ebay: ebayReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type appDispatch = typeof store.dispatch;
export const useDispatch: () => appDispatch = rawUseDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = rawUserSelector;
