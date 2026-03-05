export default async function handler(req, res) {
    const { prompt, seed } = req.query;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    // Using the dedicated image endpoint for raw data
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=1000&seed=${seed || 42}&nologo=true`;

    try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error('AI Generator Unreachable');

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.send(buffer);
    } catch (error) {
        console.error('Manifestation error:', error);
        res.status(500).json({ error: 'The Grimoire is momentarily silent.' });
    }
}
