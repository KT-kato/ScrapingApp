import { createSlice } from "@reduxjs/toolkit";
import { getEbayAccessToken } from "../api/ebay";
import { AppThunk } from "./store";
import { AxiosError } from "axios";
import { ebayTokenProps } from "../api/ebay/type";

export type ebayState = {
  ebayToken?: ebayTokenProps;
};

const initialState: ebayState = {
  ebayToken: undefined,
};

export const ebaySlice = createSlice({
  name: "ebay",
  initialState,
  reducers: {
    setEbayToken: (state, action) => {
      state.ebayToken = action.payload;
    },
  },
});

export const { setEbayToken } = ebaySlice.actions;

export const getEbayToken = (): AppThunk => (dispatch) => {
  getEbayAccessToken()
    .then((response) => {
      dispatch(setEbayToken(response.data));
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
  return;
};

export default ebaySlice.reducer;
