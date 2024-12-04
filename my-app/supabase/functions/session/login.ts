import { createClient } from "npm:@supabase/supabase-js";
import { LoginRequestBody } from "./types.ts";

export const login = async (_req: Request) => {
  const body: LoginRequestBody = await _req.json();
  const supabase = createClient(
    Deno.env.get("URL")!,
    Deno.env.get("ANON_KEY")!
  );
  const { data, error } = await supabase.auth.signInWithPassword(body);
  if (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
  return new Response(JSON.stringify(data), { status: 200 });
};
