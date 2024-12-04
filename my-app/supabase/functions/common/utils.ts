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
