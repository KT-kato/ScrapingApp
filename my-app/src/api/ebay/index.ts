import axios from "axios";
import { supabaseLocalBaseUrl } from "../constants";

export const getEbayAccessToken = async () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return await axios.get(`${supabaseLocalBaseUrl}/ebay/login`, { headers });
};

export const getEbayBlandList = async () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return await axios.get(`${supabaseLocalBaseUrl}/ebay/bland`, {
    headers,
  });
};

export const getEbayModelList = async (blandId: number) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return await axios.get(
    `${supabaseLocalBaseUrl}/ebay/bland/${blandId}/models`,
    { headers },
  );
};

export const getEbayBlandStatistics = async (
  blandId: number,
  modelId: number,
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return await axios.get(
    `${supabaseLocalBaseUrl}/ebay/bland/${blandId}/models/${modelId}`,
    { headers },
  );
};

export const getEbayBlandStatisticList = async (blandId: number) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return await axios.get(
    `${supabaseLocalBaseUrl}/ebay/bland/${blandId}/bland-statistics`,
    { headers },
  );
};
