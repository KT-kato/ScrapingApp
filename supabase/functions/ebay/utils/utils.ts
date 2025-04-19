import { Buffer } from "node:buffer";
import {
  CLIENT_CRED_SCOPE,
  EBAY_BASAE_URL,
  CLIENT_GRANT_TYPE,
  AUTH_CRED_SCOPE,
} from "./constraints.ts";
import queryString from "node:querystring";
import https, { RequestOptions } from "node:https";
import { EbayAuthTokenType } from "./types.ts";
import EbayAuthToken from "npm:ebay-oauth-nodejs-client";

export const base64Encode = (encodeData: string) => {
  const buff = Buffer.from(encodeData); // eslint-disable-line
  return buff.toString("base64");
};

const getClientToken = () => ({
  cliendId: Deno.env.get("EBAY_CLIENT_ID"),
  clientSecret: Deno.env.get("EBAY_CLIENT_SECRET"),
  redirectUri: Deno.env.get("EBAY_REDIRECT_URI"),
});

const getBasicAuthorization = () => {
  const ebayTokenRequestBody = getClientToken();
  const encodedString = base64Encode(
    `${ebayTokenRequestBody.cliendId}:${ebayTokenRequestBody.clientSecret}`
  );
  return `Basic ${encodedString}`;
};

const executeRequest = <T>(
  options: RequestOptions,
  requestbody: string
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const request = https.request(options);
    request.on("response", (response) => {
      let responseData = "";
      response.setEncoding("utf8");
      response.on("data", (data) => (responseData += data));
      response.on("end", () => {
        if (response.statusCode !== 200) {
          reject(JSON.parse(responseData));
          console.log("Error in response: ", responseData);
        } else {
          resolve(JSON.parse(responseData));
        }
      });
    });

    request.on("error", (error) =>
      reject(`Error in request: ${error.message}`)
    );
    request.end(requestbody);
  });
};

// TODO: use access token を取得するための回収が必要
export const exchangeEbayUserAccessToken = async (url: string) => {
  const code = await fetch(url).then((response) => response.body);

  const ebayTokenRequestBody = getClientToken();
  const ebayAuthToken = new EbayAuthToken(ebayTokenRequestBody);
  const userAccessToken = await ebayAuthToken.exchangeCodeForAccessToken(
    code,
    "PRODUCTION"
  );
  return JSON.parse(userAccessToken);
};

// TODO user consent を取得するためのurlを生成する: https://developer.ebay.com/api-docs/static/oauth-consent-request.html
export const generateEbayAuthorizationUrl = (
  options: { state: string; prompt: string },
  grant_type: string
) => {
  const ebayTokenRequestBody = getClientToken();
  const queryParam = `client_id=${ebayTokenRequestBody.cliendId}&redirect_uri=${ebayTokenRequestBody.redirectUri}&response_type=code&state=${options.state}&prompt=${options.prompt}&scope=${grant_type}`;
  return `${AUTH_CRED_SCOPE}?${queryParam}`;
};

// パッケージを使用してAccessToken を取得する
export const authorizeEbayUserAccessToken =
  async (): Promise<EbayAuthTokenType> => {
    const ebayTokenRequestBody = getClientToken();
    const ebayAuthToken = new EbayAuthToken(ebayTokenRequestBody);

    const applicationToken = await ebayAuthToken.getApplicationToken(
      "PRODUCTION"
    );
    return JSON.parse(applicationToken);
  };

// client 情報からAccessToken を取得する
export const getEbayApplicationAccessToken = (): Promise<EbayAuthTokenType> => {
  const auth = getBasicAuthorization();
  const requestbody = queryString.stringify({
    grant_type: CLIENT_GRANT_TYPE,
    scope: CLIENT_CRED_SCOPE,
  });

  const options = {
    headers: {
      "Content-Length": requestbody.length,
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: auth,
    },
    path: "/identity/v1/oauth2/token",
    hostname: EBAY_BASAE_URL,
    method: "POST",
  };

  return executeRequest<EbayAuthTokenType>(options, requestbody);
};
