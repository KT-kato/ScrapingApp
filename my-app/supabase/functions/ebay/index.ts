// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
  methodPatttern,
  mockResponse,
  optionsResponse,
} from "../common/utils.ts";
import { match } from "jsr:@gabriel/ts-pattern";
import { BadRequest } from "../common/errorResponses.ts";
import { getEbayAuthToken } from "./login.ts";
import { getBlandList } from "./getblandList.ts";

console.log("Hello from Functions!");

Deno.serve(async (_req: Request) => {
  const requestMethod = _req.method;

  return await match(requestMethod)
    .with(methodPatttern.OPTIONS, () => optionsResponse())
    .with(methodPatttern.GET, async () => {
      if (_req.url.includes("/ebay/bland-list")) {
        return await getBlandList(_req);
      }
      if (_req.url.includes("/ebay/login")) {
        return await getEbayAuthToken();
      }
      return mockResponse();
    })
    .with(methodPatttern.POST, () => mockResponse())
    .with(methodPatttern.PUT, () => mockResponse())
    .with(methodPatttern.DELETE, () => mockResponse())
    .with(methodPatttern.PATCH, () => mockResponse())
    .otherwise(() => BadRequest());
});
