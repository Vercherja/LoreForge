export default async function handler(req, res) {
    const { prompt, seed } = req.query;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    // High-fidelity redirect to the dedicated image endpoint
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=1000&seed=${seed || 42}&nologo=true`;

    try {
        // A direct redirect is more stable for Vercel edge functions than buffer streaming for this specific task
        res.redirect(302, imageUrl);
    } catch (error) {
        console.error('Manifestation error:', error);
        res.status(500).json({ error: 'The Grimoire is momentarily silent.' });
    }
}
