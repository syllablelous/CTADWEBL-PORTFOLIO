import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../../services/ArticleService';

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const { data } = await fetchArticle(name);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
        setError('Article not found');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !article) {
    return <div>{error || 'Article not found'}</div>;
  }

  if (!article.isActive) {
    return <div>This article is no longer available.</div>;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <h2>{article.name}</h2>
      {article.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </>
  );
}

export default ArticlePage;
