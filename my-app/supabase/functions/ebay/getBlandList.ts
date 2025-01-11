import { corsHeaders } from "../common/utils.ts";
import axios from "npm:axios";
import { CheerioAPI, load } from "npm:cheerio";
import type { Element } from "npm:domhandler";

const replaceQueryParametersForEbay = (url: string) => {
  const query = url.split("?")[1];
  const queryParameters = new URLSearchParams(query);
  const ebayQueryParameters = {
    _nkw: queryParameters.get("keywords") || "", // 商品のキーワード（検索欄の内容）
    _sacat: queryParameters.get("categoryId") || "", // 商品の型番を指定
    LH_Complete: queryParameters.get("completed") || "", // 完了した商品かどうか 0, 1
    LH_Sold: queryParameters.get("sold") || "", // 販売済みの商品かどうか 0, 1
    _salic: queryParameters.get("country") || "", // 国ID （日本：104）
    LH_PrefLoc: queryParameters.get("location") || "", // 発送元 （日本：98、米国：３）
    LH_LocatedIn: "1",
    _sop: "16",
    _dmd: "2",
    _ipg: "200",
    _fcid: "1",
    rt: "nc",
  };
  const ebayQuery = new URLSearchParams(ebayQueryParameters).toString();
  return ebayQuery;
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

type itemProp = {
  itemName: string;
  itemPrice: string | number;
  itemSippingCost: number;
};

const getItemList = async (ebayItemUrl: string) => {
  const items: itemProp[] = [];
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

        const itemSippingCostYen =
          itemShippingCost === "" ? 0 : Number(itemShippingCost);

        items.push({
          itemName,
          itemPrice:
            itemShippingCost === ""
              ? String(itemPriceYen)
              : String(itemPriceYen + itemSippingCostYen),
          itemSippingCost: itemSippingCostYen,
        });
      });
    });
    return items;
  } catch (error) {
    console.error("Error in getItemDetails: ", error);
    return items;
  }
};

// 特定のキーワードとカテゴリーのIDを元に、ebayの商品リストを取得する
export const getBlandList = async (req: Request) => {
  const ebayQuery = replaceQueryParametersForEbay(req.url);
  const ebayUrl = `https://www.ebay.com/sch/i.html?${ebayQuery}`;
  const items = await getItemList(ebayUrl);
  return new Response(
    JSON.stringify({
      url: ebayUrl,
      items,
    }),
    {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    }
  );
};
