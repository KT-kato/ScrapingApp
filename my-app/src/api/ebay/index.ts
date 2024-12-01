import axios from "axios";
import { supabaseLocalBaseUrl } from "../constants";

export const getEbayAccessToken = async () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return await axios.get(`${supabaseLocalBaseUrl}/ebay/login`, { headers });
};
