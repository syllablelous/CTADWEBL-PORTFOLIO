import React, { useState, useEffect } from "react";
import ArticleList from "../../components/ArticleList.jsx";
import { fetchArticles } from '../../services/ArticleService';

function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data } = await fetchArticles();
        setArticles(data.articles.filter(article => article.isActive));
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Articles</h1>
      <br />
      <ArticleList articles={articles} />
    </>
  );
}

export default ArticleListPage;