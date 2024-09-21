# Search Function POC

## Overview
This project implements a search function that fetches and ranks search results from YouTube, articles, academic papers, and blogs. The search results are ranked based on metrics such as views, likes, and relevance.

## Technologies Used
- Node.js
- Express
- Axios
- YouTube Data API
- Google Custom Search API
- PubMed API
- Bootstrap (for styling)

## Setup

### Prerequisites
- Node.js and npm installed
- API keys for YouTube Data API, Google Custom Search API, and PubMed API

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/search-function-poc.git
   cd search-function-poc

2. Install dependencies:
npm install
```npm install```

3.Create a .env file in the root directory and add your API keys:

```
YOUTUBE_API_KEY=your_youtube_api_key
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CX=your_google_cx
```

4. Start the server:
```npm start```

5. Open your browser and navigate to `http://localhost:3000` to view the application.


## Usage

1. Enter a search query in the search bar.
2. Click on the search button or press Enter.
3. View the search results from YouTube, articles, academic papers, and blogs.

## Project Structure

```
search-function/
├── public/
│   ├── index.html
|── server.js
├── .env
├── package.json
└── README.md

```


## API Endpoints

- `POST /search`: Fetch search results from YouTube, articles, academic papers, and blogs based on the search query.


