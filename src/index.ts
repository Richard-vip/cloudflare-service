import { handleRequest,handleOptions,handleScheduled } from './handler'


addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method === 'OPTIONS') {
    // Handle CORS preflight requests
    event.respondWith(handleOptions(request));
  } else if (request.method === 'GET' || request.method === 'HEAD' || request.method === 'POST') {
    // Handle requests to the API server
    event.respondWith(handleRequest(request));
  } else {
    event.respondWith(
      new Response(null, {
        status: 405,
        statusText: 'Method Not Allowed',
      })
    );
  }
})


addEventListener('scheduled', event => {
  event.waitUntil(handleScheduled(event));
});