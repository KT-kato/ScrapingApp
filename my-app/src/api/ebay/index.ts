import axios from "axios";
import { supabaseLocalBaseUrl } from "../constants";
import { ebayPostBlandModelStatisticsRequestBody } from "./type";

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

export const postEbayBlandModelStatistics = async (
  blandId: number,
  data: ebayPostBlandModelStatisticsRequestBody,
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return await axios.post(
    `${supabaseLocalBaseUrl}/ebay/bland/${blandId}/models/statistics`,
    { data },
    { headers },
  );
};
