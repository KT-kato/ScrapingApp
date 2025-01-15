import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as API from "../api/ebay";
import { AppThunk } from "./store";
import { AxiosError } from "axios";
import {
  blandListType,
  ebayPostBlandModelStatisticsRequestBody,
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
    postEbayBlandModelStatisticsAction: (
      _state,
      action: PayloadAction<ebayPostBlandModelStatisticsRequestBody>,
    ) => {
      console.log(action.payload);
    },
  },
});

export const {
  setEbayToken,
  getEbayBlandListAction,
  getEbayBlandStatisticListAction,
  getEbayBlandStatisticsAction,
  getEbayModelListAction,
  postEbayBlandModelStatisticsAction,
} = ebaySlice.actions;

export const getEbayToken = (): AppThunk => (dispatch) => {
  API.getEbayAccessToken()
    .then((response) => {
      dispatch(setEbayToken(response.data));
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
  return;
};

export const getBlandList = (): AppThunk => (dispatch) => {
  API.getEbayBlandList()
    .then((response) => {
      dispatch(getEbayBlandListAction(response.data));
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
  return;
};

export const getBlandModels = (blandId: number): AppThunk => (dispatch) => {
  API.getEbayModelList(blandId)
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
    API.getEbayBlandStatistics(blandId, modelId)
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
    API.getEbayBlandStatisticList(blandId)
      .then((response) => {
        dispatch(getEbayBlandStatisticListAction(response.data));
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
    return;
  };

export const postBland = (blandName: string): AppThunk => (dispatch) => {
  API.postEbayBland(blandName)
    .then((response) => {
      if (response.data.success) {
        dispatch(getBlandList());
      }
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
  return;
};

export const postBlandModel = (
  blandId: number,
  modelName: string,
): AppThunk => {
  return (dispatch) => {
    API.postEbayBlandModel(blandId, modelName)
      .then((response) => {
        if (response.data.success) {
          dispatch(getBlandModels(blandId));
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };
};

export const postBlandModelStatistics =
  (blandId: number, data: ebayPostBlandModelStatisticsRequestBody): AppThunk =>
  (dispatch) => {
    API.postEbayBlandModelStatistics(blandId, data)
      .then((response) => {
        if (response.data.success) {
          dispatch(getBlandStatisticList(blandId));
        }
        dispatch(postEbayBlandModelStatisticsAction(response.data));
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };
export const selectEbayStatus = (state: { ebay: ebayState }) => state.ebay;

export default ebaySlice.reducer;
