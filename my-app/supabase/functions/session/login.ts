import { AuthTokenResponse, createClient } from "npm:@supabase/supabase-js";
import { LoginRequestBody } from "./types.ts";
import { corsHeaders } from "../common/utils.ts";

export const login = async (_req: Request) => {
  const body: LoginRequestBody = await _req.json();
  const supabase = createClient(
    Deno.env.get("URL")!,
    Deno.env.get("ANON_KEY")!
  );
  const { data, error }: AuthTokenResponse =
    await supabase.auth.signInWithPassword(body);
  if (error) {
    return new Response(JSON.stringify(error), {
      status: error.status,
      headers: { "Content-Type": "application/json", ...corsHeaders },
      statusText: error.message,
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
};
