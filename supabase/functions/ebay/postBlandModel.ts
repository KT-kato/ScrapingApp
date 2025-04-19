import { corsHeaders, supabaseClient } from "../common/utils.ts";

type PathIds = {
  blandId: string | null;
};

const getIdsFromPath = (path: string): PathIds => {
  const regex = /\/ebay\/bland\/([^/]+)\/models/;
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

type requestBody = {
  modelName: string;
};

const getModelName = async (req: Request) => {
  const requestBody: requestBody = await req.json();
  return requestBody.modelName;
};

export const postBlandModel = async (req: Request) => {
  const modelName = await getModelName(req);
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
    await supabaseClient.from("item_model").insert([{
      bland_id: pathIds.blandId,
      bland_model_number: modelName,
    }]);

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
