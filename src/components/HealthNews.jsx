import { useState, useEffect } from 'react';
import axios from 'axios';
import './HealthNews.css';

function HealthNews() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthNews = async () => {
      try {
        const response = await axios.get(          
        `https://newsapi.org/v2/top-headlines?q=health&sortBy=publishedAt&pageSize=3&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        );
        setArticles(response.data.articles);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch health news. Please try again later.');
        setLoading(false);
      }
    };
    fetchHealthNews();
  }, []);

  if (loading) return <p>Loading health news...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    
    <div className="health-news">
      <h2>Latest Health Related News</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.description || 'No description available.'}</p>
            <p className="source">Source: {article.source.name}</p>
            <p className="date">Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HealthNews;