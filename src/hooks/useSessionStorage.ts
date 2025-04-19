import { Session, User } from "@supabase/supabase-js";
import { EbayTokenType } from "../api/session/types";

export const useSessionStorage = () => {
  const getSupabaseSessionToken = () => {
    const rowData = sessionStorage.getItem("supabaseSessionToken");
    if (rowData) {
      return JSON.parse(rowData) as Session;
    }
    return undefined;
  };

  const getSupabaseUser = () => {
    const rowData = sessionStorage.getItem("supabaseUser");
    if (rowData) {
      return JSON.parse(rowData) as User;
    }
    return undefined;
  };

  const getEbaySessionToken = () => {
    const rowData = sessionStorage.getItem("ebaySessionToken");
    if (rowData) {
      return JSON.parse(rowData) as EbayTokenType;
    }
    return undefined;
  };

  const clearSessionStorage = () => {
    sessionStorage.removeItem("supabaseSessionToken");
    sessionStorage.removeItem("supabaseUser");
    sessionStorage.removeItem("ebaySessionToken");
  };

  return {
    getSupabaseSessionToken,
    getSupabaseUser,
    getEbaySessionToken,
    clearSessionStorage,
  };
};
