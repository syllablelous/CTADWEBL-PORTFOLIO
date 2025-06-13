import React from 'react';
import '../../styles/AboutPage.css';
import profile from '../../assets/profile.jpg';

function AboutPage() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="about-content">
          <div className="profile-section">
            <div className="profile-image-container">
              <img src={profile} alt="Russel Jerome G. Rapi" className="profile-image" />
            </div>
            <div className="profile-info">
              <h1>Russel Jerome G. Rapi</h1>
              <p className="title">INF226 Student | Backend Developer, Data Analyst</p>
              <div className="social-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-details">
        <div className="about-grid">
          <div className="about-card">
            <h2>About Me</h2>
            <p>
              I am a passionate student currently taking up the subject of Advanced Web Programming in the INF226 section.
              My journey in programming has been driven by a deep curiosity for creating meaningful
              digital experiences and applying IT solutions to real-world problems.
            </p>
          </div>

          <div className="about-card">
            <h2>Education</h2>
            <div className="education-item">
              <h3>Bachelor of Science in Information Technology with a specialization in Mobile and Web Applications.</h3>
              <p>Currently enrolled in National University - Main Campus in Sampaloc, Manila.</p>
              <p>Finished high school at Legazpi City Science High School.</p>
            </div>
          </div>

          <div className="about-card">
            <h2>Skills</h2>
            <div className="skills-grid">
              <div className="skill-item">
                <h3>Frontend</h3>
                <p>React, JavaScript, HTML5, CSS3</p>
              </div>
              <div className="skill-item">
                <h3>Backend</h3>
                <p>NodeJS, Express, FastAPI, Java</p>
              </div>
              <div className='skill-item'>
                <h3>Databases and Data Analysis</h3>
                <p>MySQL, MongoDB, Python</p>
              </div>
              <div className='skill-item'>
                <h3>Mobile Development</h3>
                <p>Java, Flutter</p>
              </div>
            </div>
          </div>

          <div className="about-card">
            <h2>Interests</h2>
            <p>
              Aside from coding, I'm also interested in other hobbies such as reading, writing, drawing, and playing video games.
              I'm also interested in working on projects that deal with AI, machine learning, and data analytics.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;