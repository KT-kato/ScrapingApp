import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEbayAccessToken, getEbayBlandList } from "../api/ebay";
import { AppThunk } from "./store";
import { AxiosError } from "axios";
import {
  ebayGetBlandListQueryParameters,
  ebayGetBlandListResponseType,
  ebayTokenResponseType,
} from "../api/ebay/type";

export type ebayState = {
  ebayToken?: ebayTokenResponseType;
  blandList: ebayGetBlandListResponseType;
};

const initialState: ebayState = {
  ebayToken: undefined,
  blandList: {
    url: "",
    items: [],
  },
};

export const ebaySlice = createSlice({
  name: "ebay",
  initialState,
  reducers: {
    setEbayToken: (state, action: PayloadAction<ebayTokenResponseType>) => {
      state.ebayToken = action.payload;
    },
    getEbayBlandListAction: (
      state,
      action: PayloadAction<ebayGetBlandListResponseType>
    ) => {
      state.blandList = action.payload;
    },
  },
});

export const { setEbayToken, getEbayBlandListAction } = ebaySlice.actions;

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

export const getEbayBlandItems =
  (queryParameters: ebayGetBlandListQueryParameters): AppThunk =>
  (dispatch) => {
    getEbayBlandList(queryParameters)
      .then((response) => {
        dispatch(getEbayBlandListAction(response.data));
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
    return;
  };

export const selectEbayStatus = (state: { ebay: ebayState }) => state.ebay;

export default ebaySlice.reducer;
