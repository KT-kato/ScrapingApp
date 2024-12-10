import { AuthResponse, createClient } from "npm:@supabase/supabase-js";
import { SignUpRequestBody } from "./types.ts";
import { corsHeaders } from "../common/utils.ts";

export const signUpNewUser = async (_req: Request) => {
  const body: SignUpRequestBody = await _req.json();
  const supabase = createClient(
    Deno.env.get("URL")!,
    Deno.env.get("ANON_KEY")!
  );
  const { data, error }: AuthResponse = await supabase.auth.signUp({
    ...body,
    options: {
      emailRedirectTo: "http://localhost:5173",
    },
  });
  if (error) {
    console.log(error);
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
