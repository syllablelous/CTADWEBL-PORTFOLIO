import React, { useState, useEffect } from "react";
import ArticleList from "../../components/ArticleList.jsx";
import { fetchArticles } from '../../services/ArticleService';
import '../../styles/ArticleListPage.css';

function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data } = await fetchArticles();
        setArticles(data.articles.filter(article => article.isActive));
        setError(null);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="articles-container">
      <section className="articles-hero">
        <div className="articles-content">
          <h1>Latest Articles</h1>
          <p className="articles-subtitle">
            Explore my opinions, thoughts, and insights in various subjects and topics.
          </p>
        </div>
      </section>

      <section className="articles-list-section">
        {articles.length === 0 ? (
          <div className="no-articles">
            <h2>No Articles Available</h2>
            <p>Check back later for new content!</p>
          </div>
        ) : (
          <>
            <div className="articles-grid">
              <ArticleList articles={articles} />
            </div>
            <div className="articles-footer">
              <p>Found {articles.length} article{articles.length !== 1 ? 's' : ''}</p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default ArticleListPage;