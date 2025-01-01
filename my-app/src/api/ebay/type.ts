export type ebayTokenResponseType = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export type ebayGetBlandListQueryParameters = {
  _nkw: string;
  _sacat: string;
  LH_Complete: string;
  LH_Sold: string;
  _salic: string;
  LH_PrefLoc: string;
  LH_LocatedIn: string;
  _sop: string;
  _dmd: string;
  _ipg: string;
  _fcid: string;
  rt: string;
};

type blandListType = {
  titleName: string;
  itemPrice: number;
  itemSippingCost: number;
};
export type ebayGetBlandListResponseType = {
  url: string;
  items: blandListType[];
};
