import axios from "npm:axios";
import { corsHeaders, supabaseClient } from "../common/utils.ts";
import {
  ebayPostBlandModelStatisticsRequestBody,
  Item,
} from "./utils/types.ts";
import { CheerioAPI, load } from "npm:cheerio";
import { Element } from "npm:domhandler";

type PathIds = {
  blandId: string | null;
};

const getIdsFromPath = (path: string): PathIds => {
  const regex = /\/ebay\/bland\/([^/]+)\/models\/statistics/;
  const match = path.match(regex);

  if (match) {
    return {
      blandId: match[1] || null,
    };
  }
  return {
    blandId: null,
  };
};

export const getQueryParametersForEbay = (
  modelName: string,
  requestBody: ebayPostBlandModelStatisticsRequestBody
) => {
  const keyword = modelName;
  const blandModelNumber = requestBody.blandModelNumber || "";
  const ebayBaseQueryParameters = {
    _nkw: `${keyword} ${blandModelNumber}`, // 商品のキーワード（検索欄の内容）
    _sacat: requestBody.categoryId || "", // 商品の型番を指定
    _salic: requestBody.country, // 国ID （日本：104）
    LH_PrefLoc: requestBody.location, // 発送元 （日本：98、米国：３）
    LH_LocatedIn: "1",
    _sop: "16",
    _dmd: "2",
    _ipg: "200",
    _fcid: "1",
    rt: "nc",
  };
  const soldQueryObject = {
    ...ebayBaseQueryParameters,
    LH_Sold: "1",
    LH_Complete: "1",
  };
  const unSoldQueryObject = {
    ...ebayBaseQueryParameters,
    LH_Sold: "0",
    LH_Complete: "0",
  };
  const ebaySoldQuery = new URLSearchParams(soldQueryObject).toString();
  const ebayUnSoldQuery = new URLSearchParams(unSoldQueryObject).toString();
  return {
    sold: ebaySoldQuery,
    unSold: ebayUnSoldQuery,
  };
};

const getItemCount = ($: CheerioAPI) => {
  const itemCount = $(".srp-main-content")
    .find("div > div > div > div > div")
    .find(".srp-controls__count-heading")
    .find("span")
    .last()
    .text();
  return itemCount;
};

const getItemName = ($: CheerioAPI, element: Element) =>
  $(element).find("a").find(".s-item__title").children("span").text();
const getItemPriceYen = ($: CheerioAPI, element: Element) =>
  $(element)
    .find("div")
    .find("div")
    .find(".s-item__price")
    .text()
    .replace("$", "")
    .replace(".", "")
    .replace(",", "");
const getItemShippingCost = ($: CheerioAPI, element: Element) =>
  $(element)
    .find("div")
    .find("div")
    .find(".s-item__shipping")
    .text()
    .replace("$", "")
    .replace(".", "")
    .replace(",", "")
    .replace(" shipping", "")
    .replace("+", "")
    .replace("Free", "");

export const getItemList = async (ebayItemUrl: string) => {
  const items: Item[] = [];
  try {
    const response = await axios.get(ebayItemUrl);
    const $ = load(response.data);
    const itemCount = getItemCount($);
    if (itemCount === "") {
      return items;
    }
    const itemInfoElements = $(".s-item__info");
    itemInfoElements.map((index, element) => {
      if (index > Number(itemCount) + 1) return;
      $(element).map((_, element) => {
        const itemName = getItemName($, element);
        const itemPriceYen = Number(
          getItemPriceYen($, element).replace(/\D/g, "")
        );
        const itemShippingCost = getItemShippingCost($, element).replace(
          /\D/g,
          ""
        );

        if (itemName == "Shop on eBay") {
          return items;
        }

        const itemShippingCostYen =
          itemShippingCost === "" ? 0 : Number(itemShippingCost);

        items.push({
          itemName,
          itemPrice:
            itemShippingCost === ""
              ? String(itemPriceYen)
              : String(itemPriceYen + itemShippingCostYen),
          itemShippingCost: itemShippingCostYen.toString(),
        });
      });
    });
    return items;
  } catch (error) {
    console.error("Error in getItemDetails: ", error);
    return items;
  }
};

type itemDetail = {
  bland_name: string;
  bland_model_number: string;
  completed: boolean;
  sold: boolean;
  country: string;
  location: string;
  items: Item[];
};

export const addItemDetail = async (
  soldItemDetail: itemDetail,
  unSoldItemDetail: itemDetail
) => {
  try {
    const targetSoldData = await supabaseClient
      .from("item_detail")
      .select("*")
      .eq("bland_name", soldItemDetail.bland_name)
      .eq("bland_model_number", soldItemDetail.bland_model_number)
      .eq("completed", true)
      .eq("sold", true);

    const targetUnSoldData = await supabaseClient
      .from("item_detail")
      .select("*")
      .eq("bland_name", unSoldItemDetail.bland_name)
      .eq("bland_model_number", unSoldItemDetail.bland_model_number)
      .eq("completed", false)
      .eq("sold", false);

    const existTargetSoldData =
      targetSoldData.data &&
      targetSoldData.data.length > 0 &&
      targetSoldData.data[0].items.length > 0;
    const existTargetUnSoldData =
      targetUnSoldData.data &&
      targetUnSoldData.data.length > 0 &&
      targetUnSoldData.data[0].items.length > 0;
    const responseData = {
      soldItemCount: 0,
      soldData: {},
      unSoldItemCount: 0,
      unSoldData: {},
    };
    console.log("existTargetSoldData: ", existTargetSoldData);
    console.log("existTargetUnSoldData: ", existTargetUnSoldData);

    if (existTargetSoldData) {
      const targetId = targetSoldData.data[0].id;
      const soldData = await supabaseClient
        .from("item_detail")
        .upsert({ ...soldItemDetail, id: targetId });
      responseData.soldItemCount = soldItemDetail.items.length;
      responseData.soldData = soldData;
    } else {
      const soldData = await supabaseClient
        .from("item_detail")
        .insert([soldItemDetail]);
      responseData.soldItemCount = soldItemDetail.items.length;
      responseData.soldData = soldData;
    }
    if (existTargetUnSoldData) {
      const targetId = targetUnSoldData.data[0].id;
      const unSoldData = await supabaseClient
        .from("item_detail")
        .upsert({ ...unSoldItemDetail, id: targetId });
      responseData.unSoldItemCount = unSoldItemDetail.items.length;
      responseData.unSoldData = unSoldData;
    } else {
      const unSoldData = await supabaseClient
        .from("item_detail")
        .insert([unSoldItemDetail]);
      responseData.unSoldItemCount = unSoldItemDetail.items.length;
      responseData.unSoldData = unSoldData;
    }

    return new Response(JSON.stringify(responseData), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

// 特定のキーワードとカテゴリーのIDを元に、ebayの商品リストを取得する
export const postBlandModelStatistics = async (req: Request) => {
  const requestBody: ebayPostBlandModelStatisticsRequestBody = await req.json();
  const blandId = getIdsFromPath(req.url).blandId;
  if (!blandId) {
    return new Response(
      JSON.stringify({
        error: "Invalid path",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    const bland = await supabaseClient
      .from("item_bland")
      .select("*")
      .eq("id", blandId);
    if (!bland.data || bland.data.length === 0) {
      return new Response(
        JSON.stringify({
          error: "Invalid path",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const blandName = bland.data[0].bland_name;
    const ebayQueries = getQueryParametersForEbay(blandName, requestBody);
    const ebaySoldUrl = `https://www.ebay.com/sch/i.html?${ebayQueries.sold}`;
    const ebayUnSoldUrl = `https://www.ebay.com/sch/i.html?${ebayQueries.unSold}`;
    const soldItems = await getItemList(ebaySoldUrl);
    const unSoldItems = await getItemList(ebayUnSoldUrl);

    const soldItemDetail = {
      bland_name: blandName,
      bland_model_number: requestBody.blandModelNumber,
      completed: true,
      sold: true,
      country: requestBody.country,
      location: requestBody.location,
      items: soldItems,
    };
    const unSoldItemDetail = {
      bland_name: blandName,
      bland_model_number: requestBody.blandModelNumber,
      completed: false,
      sold: false,
      country: requestBody.country,
      location: requestBody.location,
      items: unSoldItems,
    };
    return addItemDetail(soldItemDetail, unSoldItemDetail);
  } catch {
    return new Response(
      JSON.stringify({
        error: "Invalid path",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};
