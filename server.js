require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CX = process.env.GOOGLE_CX;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const fetchYouTubeVideos = async (query) => {
    try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${YOUTUBE_API_KEY}&type=video`;
        const response = await axios.get(url);
        return response.data.items.map(item => ({
            title: item.snippet.title,
            link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            views: item.statistics ? item.statistics.viewCount : 0,
            likes: item.statistics ? item.statistics.likeCount : 0
        }));
    } catch (error) {
        console.error('Error fetching YouTube videos:', error.response ? error.response.data : error.message);
        return [];
    }
};

const fetchArticlesAndBlogs = async (query) => {
    try {
        const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}`;
        const response = await axios.get(url);
        return response.data.items.map(item => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet
        }));
    } catch (error) {
        console.error('Error fetching articles and blogs:', error.response ? error.response.data : error.message);
        return [];
    }
};

const fetchAcademicPapers = async (query) => {
    try {
        // Example using PubMed API
        const url = `https://api.ncbi.nlm.nih.gov/lit/ctxp/v1/pubmed/?format=citation&id=${query}`;
        const response = await axios.get(url);
        return response.data.items.map(item => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet
        }));
    } catch (error) {
        console.error('Error fetching academic papers:', error.response ? error.response.data : error.message);
        return [];
    }
};

app.post('/search', async (req, res) => {
    const { query, filterYouTube, filterArticles, filterPapers } = req.body;

    try {
        const promises = [];
        if (filterYouTube) promises.push(fetchYouTubeVideos(query));
        if (filterArticles) promises.push(fetchArticlesAndBlogs(query));
        if (filterPapers) promises.push(fetchAcademicPapers(query));

        const resultsArray = await Promise.all(promises);
        const results = resultsArray.flat();

        // Combine and rank results
        results.sort((a, b) => (b.views || 0) - (a.views || 0)); // Example ranking by views

        console.log('Search results:', results); // Log the results
        res.json(results);
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});