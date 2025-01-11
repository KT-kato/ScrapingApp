import axios from "npm:axios";
import { load } from "npm:cheerio";
import { createClient } from "npm:@supabase/supabase-js";

// https文字列で定数として定義
export const yahooFinanceDollarToYenExchangeURL =
  "https://finance.yahoo.co.jp/quote/USDJPY=FX";
export const ebayBaseUrl = "https://www.ebay.com/sch/i.html?";

export const methodPatttern = {
  OPTIONS: "OPTIONS",
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;

export const mockResponse = () => {
  return new Response(JSON.stringify({ message: "mock response" }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};
export const optionsResponse = () => {
  console.log("options response");
  return new Response("oK", { headers: corsHeaders });
};

export const getDollar2YenExchangeRate = async (): Promise<number> => {
  try {
    const response = await axios.get(yahooFinanceDollarToYenExchangeURL);
    const $ = load(response.data);
    const rate = $("._FxRateItem__number_1ye8x_48").text().slice(0, 3);
    return Number(rate);
  } catch (error) {
    console.error("Error in getDollar2YenExchangeRate: ", error);
    return 0;
  }
};

export const supabaseClient = createClient(
  Deno.env.get("URL")!,
  Deno.env.get("ANON_KEY")!,
);
