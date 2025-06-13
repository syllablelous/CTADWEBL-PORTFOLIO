import React from 'react';
import '../../styles/AboutPage.css';
import profile from '../../assets/profile.jpg'

function AboutPage() {
  return (
    <>
      <h1>About Page</h1>
      <img id="profile" src={profile} alt="profile picture"/>
      <br />
      <br />
      <p>Hello, and welcome to the about page section of this web app!</p>
      <p>
        My name is Russel Jerome G. Rapi, and I am an INF226 student currently
         taking up the subject of Advanced Web Programming.
      </p>
    </>
  );
}

export default AboutPage;