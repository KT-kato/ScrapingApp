import { corsHeaders, supabaseClient } from "../common/utils.ts";
import { Item } from "./utils/types.ts";

type responseData = {
  modelId: number;
  blandModelName: string;
  soldItems: {
    itemCount: number;
    averagePrice: number;
    maxPrice: number;
    minPrice: number;
  };
  unSoldItems: {
    itemCount: number;
    averagePrice: number;
    maxPrice: number;
    minPrice: number;
  };
}[];

type PathIds = {
  blandId: string | null;
};

const getIdsFromPath = (path: string): PathIds => {
  const regex = /\/ebay\/bland\/([^/]+)\/bland-statistics/;
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

const calculateBlandStatistics = (items: Item[]) => {
  const itemPrices = items.map((item) => parseFloat(item.itemPrice));

  // 価格の統計情報を取得
  // アイテム数
  const itemCount = itemPrices.length;
  // 平均
  const averagePrice = itemPrices.reduce((a, b) => a + b) / itemPrices.length;
  // 最大値
  const maxPrice = Math.max(...itemPrices);
  // 最小値
  const minPrice = Math.min(...itemPrices);
  return {
    itemCount,
    averagePrice,
    maxPrice,
    minPrice,
  };
};

export const getBlandStatisticsList = async (req: Request) => {
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
    const blandModelList = await supabaseClient.from("item_model").select("*")
      .eq(
        "bland_id",
        pathIds.blandId,
      );

    const blandModelData = await supabaseClient
      .from("item_detail")
      .select("*")
      .eq("bland_id", pathIds.blandId);

    const responseData: responseData = blandModelList.data
      ? blandModelList.data.map(
        (blandModel) => {
          const data = blandModelData.data
            ? blandModelData.data.filter(
              (item) =>
                item.bland_model_number === blandModel.bland_model_number,
            )
            : [];

          const soldItems = data
            .filter((item) => item.sold)
            .flatMap((item) => {
              return item.items.map((item: Item) => ({
                itemName: item.itemName,
                itemPrice: item.itemPrice,
                itemShippingCost: item.itemShippingCost,
              }));
            });
          const unSoldItems = data
            .filter((item) => !item.sold)
            .flatMap((item) => {
              return item.items.map((item: Item) => ({
                itemName: item.itemName,
                itemPrice: item.itemPrice,
                itemShippingCost: item.itemShippingCost,
              }));
            });

          const soldItemStatistics = calculateBlandStatistics(soldItems);
          const unSoldItemStatistics = calculateBlandStatistics(unSoldItems);
          return {
            modelId: blandModel.id,
            blandModelName: blandModel.bland_model_number,
            soldItems: soldItemStatistics,
            unSoldItems: unSoldItemStatistics,
          };
        },
      )
      : [];

    return new Response(
      JSON.stringify({
        statisticList: responseData,
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
