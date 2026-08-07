// Vercel serverless function — replaces the Vite dev proxy on production.
// The browser calls POST /api/chat; this forwards to MiniMax with the API key
// read from the server-side env (never exposed to the client).

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'MINIMAX_API_KEY is not set on the server.' });
    return;
  }

  const model = process.env.MINIMAX_MODEL || 'MiniMax-M3';

  try {
    // Vercel's Node runtime auto-parses JSON bodies, so req.body is already
    // an object. Handle both the auto-parsed object and a raw string just in case.
    let body = req.body;
    if (typeof body === 'string') {
      body = body ? JSON.parse(body) : {};
    }
    if (!body || typeof body !== 'object') {
      body = {};
    }

    const upstream = await fetch('https://api.minimax.io/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: body.model || model,
        messages: body.messages || [],
      }),
    });

    const text = await upstream.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text || 'Empty response from upstream' };
    }

    res.status(upstream.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Upstream request failed' });
  }
}
