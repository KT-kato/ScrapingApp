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
