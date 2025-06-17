export default {
  async fetch(request) {
    const url = new URL(request.url);
    const contract = url.searchParams.get('contract');
    if (!contract) {
      return new Response(JSON.stringify({ error: 'Missing contract' }), {
        status: 400,
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }
    const apiUrl = `https://api.dexscreener.com/latest/dex/tokens/${contract}`;
    const apiRes = await fetch(apiUrl);
    const data = await apiRes.text();
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
