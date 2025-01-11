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
import { getBlandModelList } from "./getBlandModelList.ts";
import { postBlandItems } from "./postBlandList.ts";
import { getBlandList } from "./getBlandList.ts";
import { getBlandStatisticsList } from "./getBlandStatisticsList.ts";
import { getBlandStatistics } from "./getBlandStatistics.ts";

Deno.serve(async (_req: Request) => {
  const requestMethod = _req.method;

  return await match(requestMethod)
    .with(methodPatttern.OPTIONS, () => optionsResponse())
    .with(methodPatttern.GET, async () => {
      if (/\/ebay\/bland$/.test(_req.url)) {
        return await getBlandList();
      }
      if (/\/ebay\/bland\/[^/]+\/models$/.test(_req.url)) {
        return await getBlandModelList(_req);
      }
      if (/\/ebay\/bland\/[^/]+\/models\/[^/]+$/.test(_req.url)) {
        return await getBlandStatistics(_req);
      }
      if (
        /\/ebay\/bland\/[^/]+\/bland-statistics$/.test(_req.url)
      ) {
        return await getBlandStatisticsList(_req);
      }
      if (_req.url.includes("/ebay/login")) {
        return await getEbayAuthToken();
      }
      return mockResponse();
    })
    .with(methodPatttern.POST, () => {
      if (_req.url.includes("/ebay/bland-list")) {
        return postBlandItems(_req);
      }
      return mockResponse();
    })
    .with(methodPatttern.PUT, () => mockResponse())
    .with(methodPatttern.DELETE, () => mockResponse())
    .with(methodPatttern.PATCH, () => mockResponse())
    .otherwise(() => BadRequest());
});
