export type EbayAuthTokenType = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export type ebayGetBlandListRequestType = {
  limit: number;
  offset: number;
  filter: string;
};

export type ebayPostBlandModelStatisticsRequestBody = {
  blandModelNumber: string;
  categoryId: string;
  country: string;
  location: string;
};

export type blandListType = {
  id: number;
  created_at: Date;
  bland_name: string;
};

export type Item = {
  itemName: string;
  itemPrice: string;
  itemShippingCost: string;
};
export type blandListResponseType = {
  id: number;
  created_at: Date;
  bland_name: string;
  bland_model_number: string;
  completed: boolean;
  sold: boolean;
  country: number;
  location: number;
  items: Item[];
};
