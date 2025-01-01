import { AuthResponse, AuthTokenResponse } from "@supabase/supabase-js";

export type EbayTokenType = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type LoginResponseType = AuthTokenResponse & {
  ebayToken: EbayTokenType;
};

export type SignUpRequestBody = {
  email: string;
  password: string;
};

export type SignUpResponseType = AuthResponse & {
  ebayToken: EbayTokenType;
};
