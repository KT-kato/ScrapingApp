import { AuthResponse, AuthTokenResponse } from "@supabase/supabase-js";

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type LoginResponseType = AuthTokenResponse;

export type SignUpRequestBody = {
  email: string;
  password: string;
};

export type SignUpResponseType = AuthResponse;
