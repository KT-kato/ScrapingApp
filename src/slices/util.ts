import { Session, User } from "@supabase/supabase-js";
import { AxiosError } from "axios";
import { EbayTokenType } from "../api/session/types";

export type responseErrorType = {
  message: string;
  status: number;
};

export const errorHandler = (error: AxiosError): responseErrorType => {
  if (error.response) {
    return {
      message: error.message,
      status: error.response.status,
    };
  } else {
    return {
      message: error.message,
      status: 500,
    };
  }
};

export const setSupabaseSessionToken = (session: Session) => {
  sessionStorage.setItem("supabaseSessionToken", JSON.stringify(session));
};

export const setSupabaseUser = (user: User) => {
  sessionStorage.setItem("supabaseUser", JSON.stringify(user));
};

export const setEbaySessionToken = (ebayToken: EbayTokenType) => {
  sessionStorage.setItem("ebaySessionToken", JSON.stringify(ebayToken));
};
