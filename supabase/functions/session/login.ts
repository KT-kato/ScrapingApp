import { AuthTokenResponse } from 'npm:@supabase/supabase-js'
import { LoginRequestBody } from './types.ts'
import { corsHeaders, supabaseClient } from '../common/utils.ts'
import { getEbayApplicationAccessToken } from '../ebay/utils/utils.ts'

export const login = async (_req: Request) => {
  const body: LoginRequestBody = await _req.json()
  const { data, error }: AuthTokenResponse =
    await supabaseClient.auth.signInWithPassword(body)
  if (!data) {
    return new Response('Invalid credentials', {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
  if (error) {
    return new Response(JSON.stringify(error), {
      status: error.status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      statusText: error.message,
    })
  }

  try {
    const ebayToken = await getEbayApplicationAccessToken()
    const responseData = {
      user: data.user,
      session: data.session,
      ebayToken: ebayToken,
    }
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error,
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      },
    )
  }
}
