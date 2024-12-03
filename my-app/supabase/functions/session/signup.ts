import { createClient } from "npm:@supabase/supabase-js";
import { SignUpRequestBody } from "./types.ts";

export const signUpNewUser = async (_req: Request) => {
  const body: SignUpRequestBody = await _req.json();
  const supabase = createClient(
    Deno.env.get("URL")!,
    Deno.env.get("ANON_KEY")!
  );
  const { data, error } = await supabase.auth.signUp({
    ...body,
    options: {
      emailRedirectTo: "http://localhost:5173/",
    },
  });
  if (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
  return new Response(JSON.stringify(data), { status: 200 });
};
