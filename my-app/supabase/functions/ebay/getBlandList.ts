import { corsHeaders, supabaseClient } from "../common/utils.ts";
import { blandListType } from "./utils/types.ts";

export const getBlandList = async () => {
  try {
    const data = await supabaseClient.from("item_bland").select("*");
    const responseData = data.data !== null
      ? data.data.map((item: blandListType) => {
        return {
          id: item.id,
          blandName: item.bland_name,
        };
      })
      : [];
    return new Response(JSON.stringify({ blandList: responseData }), {
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
      },
    );
  }
};
