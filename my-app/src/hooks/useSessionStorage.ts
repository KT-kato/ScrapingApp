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

  const setSupabaseSessionToken = (session: Session) => {
    sessionStorage.setItem("supabaseSessionToken", JSON.stringify(session));
  };

  const setSupabaseUser = (user: User) => {
    sessionStorage.setItem("supabaseUser", JSON.stringify(user));
  };

  const setEbaySessionToken = (ebayToken: EbayTokenType) => {
    sessionStorage.setItem("ebaySessionToken", JSON.stringify(ebayToken));
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
    setSupabaseSessionToken,
    setSupabaseUser,
    setEbaySessionToken,
    clearSessionStorage,
  };
};
