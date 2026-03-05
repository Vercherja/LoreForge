export default async function handler(req, res) {
    const { prompt, seed } = req.query;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    // Pollinations.ai URL construction
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=800&height=1000&seed=${seed || 42}&nologo=true`;

    try {
        // We redirect the browser to the image URL. 
        // On a live site, the browser treats this as a valid cross-origin image load.
        res.redirect(302, imageUrl);
    } catch (error) {
        res.status(500).json({ error: 'Failed to manifest portrait' });
    }
}
