import { corsHeaders, supabaseClient } from "../common/utils.ts";
import { Item } from "./utils/types.ts";

type PathIds = {
  blandId: string | null;
  modelId: string | null;
};
const getIdsFromPath = (path: string): PathIds => {
  const regex = /\/ebay\/bland\/([^/]+)\/models\/([^/]+)/;
  const match = path.match(regex);

  if (match) {
    return {
      blandId: match[1] || null,
      modelId: match[2] || null,
    };
  }
  return {
    blandId: null,
    modelId: null,
  };
};

export const getBlandStatistics = async (req: Request) => {
  const pathIds = getIdsFromPath(req.url);
  if (!pathIds.blandId) {
    return new Response(
      JSON.stringify({
        error: "Invalid path",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }

  try {
    const data = await supabaseClient
      .from("item_detail")
      .select("*")
      .eq("bland_id", pathIds.blandId)
      .eq("model_id", pathIds.modelId);

    const soldItems = data.data !== null
      ? data.data
        .filter((item) => item.sold)
        .flatMap((item) => {
          return item.items.map((item: Item) => ({
            itemName: item.itemName,
            itemPrice: item.itemPrice,
            itemShippingCost: item.itemShippingCost,
          }));
        })
      : [];
    const unSoldItems = data.data !== null
      ? data.data
        .filter((item) => !item.sold)
        .flatMap((item) => {
          return item.items.map((item: Item) => ({
            itemName: item.itemName,
            itemPrice: item.itemPrice,
            itemShippingCost: item.itemShippingCost,
          }));
        })
      : [];
    const responseData = {
      modelId: pathIds.modelId,
      blandModelName: data.data ? data.data[0].bland_model_number : "",
      soldItems: soldItems,
      unSoldItems: unSoldItems,
    };
    return new Response(
      JSON.stringify({
        statistics: responseData,
      }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }
};
