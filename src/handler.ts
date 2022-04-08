const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  // 'Access-Control-Max-Age': '86400',
  'Content-Type': 'application/json;charset=UTF-8',
};

export const handleOptions = (request: Request) => {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  const headers = request.headers;
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    const respHeaders = {
      ...corsHeaders,
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || '',
    };

    return new Response(null, {
      headers: respHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    });
  }
}

const createResponse = (data: Record<string, unknown>) => {
  return new Response(JSON.stringify(data), { headers: corsHeaders })
}

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  if (request.method === "GET") {
    const { pathname, searchParams } = url;
    console.log("debug", pathname)
    if (pathname === '/get') {
      const key = searchParams.get('key');
      let val: null | string = "";
      if (key) {
        val = await KV.get(key);
      }
      return createResponse({ data: val });
    } else {
      return createResponse({ data: "未定义的 api" })
    }
  }
  return new Response('hello world')
}



export const handleScheduled = async (event: ScheduledEvent) => {
  await KV.put('name', 'wangrenjie' + new Date().getTime());
  return
} 