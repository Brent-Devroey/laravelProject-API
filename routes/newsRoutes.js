const express = require('express');
const newsService = require('../services/newsService');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newsData = req.body;
        const newsId = await newsService.createNews(newsData);
        res.status(200).json({ message: "News created", newsId });
    } catch (e) {
        if (Array.isArray(e)){
            return res.status(400).json({message: "Validation failed", errors: e})
        }
        res.status(500).json({ message: "Error creating news", error: e.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const news = await newsService.getNews();
        res.status(200).json(news);
    } catch (e) {
        res.status(500).json({ message: "Error fetching news", error: e.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const news = await newsService.getNewsById(id);
        res.status(200).json(news);
    } catch (e) {
        res.status(404).json({ message: "News not found", error: e.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newsData = req.body;
    try {
        const result = await newsService.updateNews(id, newsData);
        res.status(200).json({ message: "News updated", result });
    } catch (e) {
        if (Array.isArray(e)){
            return res.status(400).json({message: "Validation failed", errors: e})
        }
        res.status(500).json({ message: "Error updating news", error: e.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await newsService.deleteNews(id);
        res.status(200).json({message: `News with ID ${id} has been deleted successfully.`});

    } catch (e) {
        res.status(500).json({ message: "Error deleting news", error: e.message });
    }
});

module.exports = router;