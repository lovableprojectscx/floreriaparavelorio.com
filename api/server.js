import server from "../dist/server/server.js";

export default async function handler(request, response) {
  const { fetch } = server;
  
  // Convert Node.js request to Web Request
  const protocol = request.headers['x-forwarded-proto'] || 'http';
  const host = request.headers['host'];
  const url = new URL(request.url, `${protocol}://${host}`);
  
  const webRequest = new Request(url.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request : undefined,
  });

  const webResponse = await fetch(webRequest);
  
  // Convert Web Response back to Node.js response
  response.status(webResponse.status);
  webResponse.headers.forEach((value, key) => {
    response.setHeader(key, value);
  });
  
  const body = await webResponse.arrayBuffer();
  response.send(Buffer.from(body));
}
