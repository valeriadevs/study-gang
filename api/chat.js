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
    const body = JSON.parse(req.body || '{}');
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

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Upstream request failed' });
  }
}
