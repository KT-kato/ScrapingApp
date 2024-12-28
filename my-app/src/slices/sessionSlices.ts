import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSessionToken, signUpNewUser } from "../api/session";
import { AppThunk } from "./store";
import { AxiosError } from "axios";
import {
  LoginRequestBody,
  LoginResponseType,
  SignUpRequestBody,
  SignUpResponseType,
} from "../api/session/types";
import { Session } from "@supabase/supabase-js";
import { errorHandler, responseErrorType } from "./util";

export type sessionState = {
  session?: Session;
  errorMessage?: responseErrorType;
  isRequesting: boolean;
};

const initialState: sessionState = {
  session: undefined,
  errorMessage: undefined,
  isRequesting: false,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    startReqirest: (state) => {
      state.isRequesting = true;
    },
    setErrorMessage: (state, action: PayloadAction<responseErrorType>) => {
      state.errorMessage = action.payload;
    },
    setLoginSuccess: (state, action: PayloadAction<LoginResponseType>) => {
      state.session = action.payload.data.session || undefined;
    },
    setSignUpSuccess: (state, action: PayloadAction<SignUpResponseType>) => {
      state.session = action.payload.data.session || undefined;
    },
    finishRequest: (state) => {
      state.isRequesting = false;
    },
  },
});

export const {
  setLoginSuccess,
  setSignUpSuccess,
  setErrorMessage,
  startReqirest,
  finishRequest,
} = sessionSlice.actions;

export const login =
  (data: LoginRequestBody): AppThunk =>
  (dispatch) => {
    dispatch(startReqirest());
    getSessionToken(data)
      .then((response) => {
        dispatch(setLoginSuccess(response));
      })
      .catch((error: AxiosError) =>
        dispatch(setErrorMessage(errorHandler(error)))
      )
      .finally(() => dispatch(finishRequest()));
    return;
  };

export const signUpUser =
  (data: SignUpRequestBody): AppThunk =>
  (dispatch) => {
    dispatch(startReqirest());
    signUpNewUser(data)
      .then((response) => {
        dispatch(setSignUpSuccess(response));
      })
      .catch((error: AxiosError) =>
        dispatch(setErrorMessage(errorHandler(error)))
      )
      .finally(() => dispatch(finishRequest()));
    return;
  };

export const selectSessionStatus = (state: { session: sessionState }) =>
  state.session;

export default sessionSlice.reducer;
