import { Buffer } from 'node:buffer'
import https from 'node:https'
import queryString from 'node:querystring'
import { corsHeaders } from '../common/utils.ts'

type BodyType = {
  cliendId: string
  clientSecret: string
  redirectUri: string
}

const CLIENT_CRED_SCOPE = 'https://api.ebay.com/oauth/api_scope'
const GRANT_TYPE = 'client_credentials'
const EBAY_BASAE_URL = 'api.ebay.com'

const base64Encode = (encodeData: string) => {
  const buff = Buffer.from(encodeData)
  return buff.toString('base64')
}

const getResponseToken = (body: BodyType): Promise<string> => {
  const requestbody = queryString.stringify({
    grant_type: GRANT_TYPE,
    scope: CLIENT_CRED_SCOPE,
  })

  const encodedString = base64Encode(`${body.cliendId}:${body.clientSecret}`)
  const auth = `Basic ${encodedString}`

  const options = {
    headers: {
      'Content-Length': requestbody.length,
      'Content-Type': 'application/x-www-form-urlencoded',
      authorization: auth,
    },
    path: '/identity/v1/oauth2/token',
    hostname: EBAY_BASAE_URL,
    method: 'POST',
  }

  return new Promise((resolve, reject) => {
    const request = https.request(options)
    request.on('response', response => {
      let responseData = ''
      response.setEncoding('utf8')
      response.on('data', data => (responseData += data))
      response.on('end', () => {
        if (response.statusCode !== 200) {
          reject(responseData)
          console.log('Error in response: ', responseData)
        } else {
          resolve(responseData)
        }
      })
    })

    request.on('error', error => reject(`Error in request: ${error.message}`))
    request.end(requestbody)
  })
}

export const getEbayAuthToken = async () => {
  const ebayTokenRequestBody = {
    cliendId: Deno.env.get('EBAY_CLIENT_ID') as string,
    clientSecret: Deno.env.get('EBAY_CLIENT_SECRET') as string,
    redirectUri: Deno.env.get('EBAY_REDIRECT_URI') as string,
  }
  try {
    const response = await getResponseToken(ebayTokenRequestBody)
    return new Response(response, {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (error) {
    return new Response(error as string, {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
}
