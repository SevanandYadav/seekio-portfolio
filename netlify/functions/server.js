exports.handler = async (event, context) => {
  const { createRequestHandler } = await import("@react-router/node");
  const build = await import("../../build/server/index.js");
  
  const handler = createRequestHandler({ build, mode: "production" });
  
  const request = new Request(event.rawUrl || `https://${event.headers.host}${event.path}`, {
    method: event.httpMethod,
    headers: new Headers(event.headers),
    body: event.body && event.isBase64Encoded ? Buffer.from(event.body, "base64") : event.body,
  });

  const response = await handler(request);
  const body = await response.text();
  
  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body,
  };
};
