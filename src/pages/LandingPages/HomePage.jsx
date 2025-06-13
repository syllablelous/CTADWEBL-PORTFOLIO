import React from 'react';
import '../../styles/HomePage.css';
import hello from '../../assets/hello.png';

function HomePage() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to My Portfolio</h1>
          <p className="hero-subtitle">Exploring the intersection of technology and creativity</p>
          <div className="hero-image-container">
            <img src={hello} alt="Welcome illustration" className="hero-image" />
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>What I Do</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Web Development</h3>
            <p>Creating modern, responsive web applications with cutting-edge technologies</p>
          </div>
          <div className="feature-card">
            <h3>Programming</h3>
            <p>Building robust and efficient solutions to complex problems</p>
          </div>
          <div className="feature-card">
            <h3>Learning</h3>
            <p>Constantly expanding my knowledge in Advanced Web Programming</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Connect?</h2>
        <p>Explore my work, read my articles, or get in touch to discuss potential collaborations.</p>
        <div className="cta-buttons">
          <a href="/about" className="cta-button primary">Learn More About Me</a>
          <a href="/articles" className="cta-button secondary">Read My Articles</a>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
