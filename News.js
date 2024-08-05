import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './News.css';

function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/news');
        setNews(response.data);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Error fetching news');
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h2 className="news-header">News List</h2>
      <button className="upload-button" onClick={() => navigate('/upload')}>Upload File</button>
      {error && <div className="error-message">{error}</div>}
      <div className="news-list">
        {news.map((item, index) => (
          <div key={index} className="news-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
