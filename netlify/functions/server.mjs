import { createRequestListener } from "@react-router/node";
import * as build from "../../build/server/index.js";

const requestListener = createRequestListener({ build, mode: "production" });

export async function handler(event) {
  const request = new Request(event.rawUrl || `https://${event.headers.host}${event.path}`, {
    method: event.httpMethod,
    headers: event.headers,
    body: event.httpMethod !== "GET" && event.httpMethod !== "HEAD" ? event.body : undefined,
  });

  const response = await requestListener(request);
  
  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers),
    body: await response.text(),
  };
}
