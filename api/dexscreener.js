export default async function handler(req, res) {
  const { contract } = req.query;
  if (!contract) {
    res.status(400).json({ error: 'Missing contract' });
    return;
  }
  const apiUrl = `https://api.dexscreener.com/latest/dex/tokens/${contract}`;
  try {
    const apiRes = await fetch(apiUrl);
    const data = await apiRes.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch from DexScreener' });
  }
}