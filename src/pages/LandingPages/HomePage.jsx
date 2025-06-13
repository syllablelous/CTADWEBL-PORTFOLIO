import React from 'react';
import '../../styles/HomePage.css';
import hello from '../../assets/hello.png'

function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <img src={hello} alt="hello" />
      <p>Hello, and welcome to the home page!</p>
      <p>You've reached the start of it all.</p>
    </>  
  );
}

export default HomePage;
