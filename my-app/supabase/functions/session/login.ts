import { AuthTokenResponse, createClient } from "npm:@supabase/supabase-js";
import { LoginRequestBody } from "./types.ts";
import { corsHeaders } from "../common/utils.ts";
import { getEbayApplicationAccessToken } from "../ebay/utils/utils.ts";

export const login = async (_req: Request) => {
  const body: LoginRequestBody = await _req.json();
  const supabase = createClient(
    Deno.env.get("URL")!,
    Deno.env.get("ANON_KEY")!
  );
  const { data, error }: AuthTokenResponse =
    await supabase.auth.signInWithPassword(body);
  if (!data) {
    return new Response("Invalid credentials", {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
  if (error) {
    return new Response(JSON.stringify(error), {
      status: error.status,
      headers: { "Content-Type": "application/json", ...corsHeaders },
      statusText: error.message,
    });
  }

  try {
    const ebayToken = await getEbayApplicationAccessToken();
    const responseData = {
      user: data.user,
      session: data.session,
      ebayToken: ebayToken,
    };
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (_error) {
    return new Response("invalid Ebay credentials", {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};
