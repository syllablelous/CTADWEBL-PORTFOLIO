import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleList.css'

function ArticleList({ articles }) {
  return (
    <div className='article-list'>
      {articles.map(a => (
        <Link key={a.name} to={`/articles/${a.name}`} className='article-item'>
          <h3>{a.title}</h3>
          <p>{a.content[0].substring(0, 150)}</p>
        </Link>
      ))}
    </div>
  );
}

export default ArticleList;