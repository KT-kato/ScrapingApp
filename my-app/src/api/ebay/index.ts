import axios from "axios";
import { supabaseLocalBaseUrl } from "../constants";
import { ebayGetBlandListQueryParameters } from "./type";

export const getEbayAccessToken = async () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return await axios.get(`${supabaseLocalBaseUrl}/ebay/login`, { headers });
};

export const getEbayBlandList = async (
  queryParameters: ebayGetBlandListQueryParameters
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return await axios.get(`${supabaseLocalBaseUrl}/ebay/bland-list`, {
    headers,
    params: queryParameters,
  });
};
