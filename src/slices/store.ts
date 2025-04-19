import { configureStore } from '@reduxjs/toolkit'
import ebayReducer from './ebaySlices'
import sessionReducer from './sessionSlices'
import spinnerReducer from './spinnerSlices'

import type { Action, ThunkAction } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as rawUseDispatch,
  useSelector as rawUserSelector,
} from 'react-redux'

export const store = configureStore({
  reducer: {
    ebay: ebayReducer,
    session: sessionReducer,
    spinner: spinnerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export type appDispatch = typeof store.dispatch
export const useDispatch: () => appDispatch = rawUseDispatch
export const useSelector: TypedUseSelectorHook<RootState> = rawUserSelector
