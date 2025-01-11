export type ebayTokenResponseType = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export type ebayGetBlandListQueryParameters = {
  keywords: string;
  blandModelNumber: string;
  categoryId: string;
  country: string;
  location: string;
};

export type blandListType = {
  id: number;
  blandName: string;
};
export type getBlandListResponseType = { blandList: blandListType[] };

export type modelListType = {
  id: number;
  blandModelName: string;
};

export type getBlandModelListResponseType = { modelList: modelListType[] };

export type getBlandModelType = {
  modelId: number;
  blandModelName: string;
  soldItems: {
    itemName: string;
    itemPrice: number;
    itemShippingCost: number;
  }[];
  unSoldItems: {
    itemName: string;
    itemPrice: number;
    itemShippingCost: number;
  }[];
};

export type getBlandStatisticsResponseType = {
  statistics: getBlandModelType;
};

export type getBlandStatisticType = {
  modelId: number;
  blandModelName: string;
  soldItems: {
    itemCount: number;
    averagePrice: number;
    maxPrice: number;
    minPrice: number;
  };
  unSoldItems: {
    itemCount: number;
    averagePrice: number;
    maxPrice: number;
    minPrice: number;
  };
};

export type getBlandStatisticListResponseType = {
  statisticList: getBlandStatisticType[];
};
