import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getEbayAccessToken,
  getEbayBlandList,
  getEbayBlandStatisticList,
  getEbayBlandStatistics,
  getEbayModelList,
} from "../api/ebay";
import { AppThunk } from "./store";
import { AxiosError } from "axios";
import {
  blandListType,
  ebayTokenResponseType,
  getBlandListResponseType,
  getBlandModelListResponseType,
  getBlandModelType,
  getBlandStatisticListResponseType,
  getBlandStatisticsResponseType,
  getBlandStatisticType,
  modelListType,
} from "../api/ebay/type";

export type ebayState = {
  ebayToken?: ebayTokenResponseType;
  blandList: blandListType[];
  modelList: modelListType[];
  blandStatistics?: getBlandModelType;
  blandStatisticList: getBlandStatisticType[];
};

const initialState: ebayState = {
  ebayToken: undefined,
  blandList: [],
  modelList: [],
  blandStatistics: undefined,
  blandStatisticList: [],
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
      action: PayloadAction<getBlandListResponseType>,
    ) => {
      state.blandList = action.payload.blandList;
    },
    getEbayModelListAction: (
      state,
      action: PayloadAction<getBlandModelListResponseType>,
    ) => {
      state.modelList = action.payload.modelList;
    },
    getEbayBlandStatisticsAction: (
      state,
      action: PayloadAction<getBlandStatisticsResponseType>,
    ) => {
      state.blandStatistics = action.payload.statistics;
    },
    getEbayBlandStatisticListAction: (
      state,
      action: PayloadAction<getBlandStatisticListResponseType>,
    ) => {
      state.blandStatisticList = action.payload.statisticList;
    },
  },
});

export const {
  setEbayToken,
  getEbayBlandListAction,
  getEbayBlandStatisticListAction,
  getEbayBlandStatisticsAction,
  getEbayModelListAction,
} = ebaySlice.actions;

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

export const getBlandList = (): AppThunk => (dispatch) => {
  getEbayBlandList()
    .then((response) => {
      dispatch(getEbayBlandListAction(response.data));
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
  return;
};

export const getBlandModels = (blandId: number): AppThunk => (dispatch) => {
  getEbayModelList(blandId)
    .then((response) => {
      dispatch(getEbayModelListAction(response.data));
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
  return;
};

export const getBlandStatistics =
  (blandId: number, modelId: number): AppThunk => (dispatch) => {
    getEbayBlandStatistics(blandId, modelId)
      .then((response) => {
        dispatch(getEbayBlandStatisticsAction(response.data));
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
    return;
  };

export const getBlandStatisticList =
  (blandId: number): AppThunk => (dispatch) => {
    getEbayBlandStatisticList(blandId)
      .then((response) => {
        dispatch(getEbayBlandStatisticListAction(response.data));
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
    return;
  };

export const selectEbayStatus = (state: { ebay: ebayState }) => state.ebay;

export default ebaySlice.reducer;
