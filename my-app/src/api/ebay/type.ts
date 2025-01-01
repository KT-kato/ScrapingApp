export type ebayTokenResponseType = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export type ebayGetBlandListQueryParameters = {
  keywords: string;
  categoryId: string;
  completed: string;
  sold: string;
  country: string;
  location: string;
};

type blandListType = {
  itemName: string;
  itemPrice: number;
  itemSippingCost: number;
};
export type ebayGetBlandListResponseType = {
  url: string;
  items: blandListType[];
};
