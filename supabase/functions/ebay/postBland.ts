import { corsHeaders, supabaseClient } from "../common/utils.ts";

type requestBody = {
  blandName: string;
};

const getBlandName = async (req: Request) => {
  const requestBody: requestBody = await req.json();
  return requestBody.blandName;
};

export const postBland = async (req: Request) => {
  const blandName = await getBlandName(req);

  try {
    const res = await supabaseClient.from("item_bland").insert([{
      bland_name: blandName,
    }]);
    console.log(res);
    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  } catch {
    return new Response(
      JSON.stringify({
        error: "Failed to insert",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }
};
