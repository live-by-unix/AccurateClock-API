export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store"
    };

    // --- CORS preflight ---
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    // --- ROUTER ---
    if (path === "/api/time") return handleTime(request, headers);
    if (path === "/api/raw-time") return handleOffset(request, headers);
    if (path === "/api/meta") return handleMeta(request, headers);

    // Root or unknown path
    return new Response(
      JSON.stringify({
        error: "Not found",
        available_endpoints: ["/api/time", "/api/raw-time", "/api/meta"]
      }),
      { status: 404, headers }
    );
  }
};

// -------------------------
// /api/time
// -------------------------
function handleTime(request, headers) {
  const t0 = performance.now();
  const now = Date.now();
  const latency = performance.now() - t0;

  const body = {
    epoch_ms: now,
    iso_utc: new Date(now).toISOString(),
    latency_ms: latency,
    region: request.cf?.colo || "unknown",
    version: "1"
  };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers
  });
}

// -------------------------
// /api/raw-time
// -------------------------
function handleOffset(request, headers) {
  const body = {
    server_epoch_ms: Date.now()
    // client_received_ms is added by the client
  };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers
  });
}

// -------------------------
// /api/meta
// -------------------------
function handleMeta(request, headers) {
  const body = {
    service: "accurateclock",
    api_version: "1",
    runtime: "cloudflare-worker",
    region: request.cf?.colo || "unknown",
    features: ["time", "raw-time", "meta"]
  };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers
  });
}
