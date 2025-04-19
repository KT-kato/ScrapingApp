import { AuthResponse } from "npm:@supabase/supabase-js";
import { SignUpRequestBody } from "./types.ts";
import { corsHeaders, supabaseClient } from "../common/utils.ts";
import { getEbayApplicationAccessToken } from "../ebay/utils/utils.ts";

export const signUpNewUser = async (_req: Request) => {
  const body: SignUpRequestBody = await _req.json();
  const { data, error }: AuthResponse = await supabaseClient.auth.signUp({
    ...body,
    options: {
      emailRedirectTo: "http://localhost:5173",
    },
  });
  if (!data) {
    return new Response("Invalid Supabase credentials", {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
  if (error) {
    console.log(error);
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
  } catch (error) {
    return new Response(
      JSON.stringify({
        error,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }
};
