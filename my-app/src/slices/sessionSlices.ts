import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSessionToken, signUpNewUser } from "../api/session";
import { AppThunk } from "./store";
import { AxiosError } from "axios";
import {
  EbayTokenType,
  LoginRequestBody,
  LoginResponseType,
  SignUpRequestBody,
  SignUpResponseType,
} from "../api/session/types";
import { Session, User } from "@supabase/supabase-js";
import {
  errorHandler,
  responseErrorType,
  setEbaySessionToken,
  setSupabaseSessionToken,
  setSupabaseUser,
} from "./util";
import { closeSpinner, showSpinner } from "./spinnerSlices";

export type sessionState = {
  session?: Session;
  user?: User;
  ebayToken?: EbayTokenType;
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
    startRequest: (state) => {
      state.isRequesting = true;
    },
    setErrorMessage: (state, action: PayloadAction<responseErrorType>) => {
      state.errorMessage = action.payload;
    },
    setLoginSuccess: (state, action: PayloadAction<LoginResponseType>) => {
      console.log(action.payload);
      if (!action.payload) {
        return;
      }
      state.session = action.payload.session;
      state.user = action.payload.user;
      state.ebayToken = action.payload.ebayToken;

      setSupabaseSessionToken(action.payload.session);
      setSupabaseUser(action.payload.user);
      setEbaySessionToken(action.payload.ebayToken);
    },
    setSignUpSuccess: (state, action: PayloadAction<SignUpResponseType>) => {
      if (!action.payload.session || !action.payload.user) {
        return;
      }
      state.session = action.payload.session;
      state.user = action.payload.user;
      state.ebayToken = action.payload.ebayToken;

      setSupabaseSessionToken(action.payload.session);
      setSupabaseUser(action.payload.user);
      setEbaySessionToken(action.payload.ebayToken);
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
  startRequest,
  finishRequest,
} = sessionSlice.actions;

export const login = (data: LoginRequestBody): AppThunk => (dispatch) => {
  dispatch(showSpinner());
  dispatch(startRequest());
  getSessionToken(data)
    .then((response) => {
      dispatch(setLoginSuccess(response));
    })
    .catch((error: AxiosError) => {
      dispatch(setErrorMessage(errorHandler(error)));
    })
    .finally(() => {
      dispatch(finishRequest());
      dispatch(closeSpinner());
    });
  return;
};

export const signUpUser = (data: SignUpRequestBody): AppThunk => (dispatch) => {
  dispatch(showSpinner());
  dispatch(startRequest());
  signUpNewUser(data)
    .then((response) => {
      dispatch(setSignUpSuccess(response));
    })
    .catch((error: AxiosError) => {
      dispatch(setErrorMessage(errorHandler(error)));
    })
    .finally(() => {
      dispatch(finishRequest());
      dispatch(closeSpinner());
    });

  return;
};

export const selectSessionStatus = (state: { session: sessionState }) =>
  state.session;

export default sessionSlice.reducer;
