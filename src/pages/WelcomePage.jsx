import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/WelcomePage.css';

const WelcomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state || {};

  const [fadeClass, setFadeClass] = useState('fade-in'); 
  
  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setFadeClass('fade-out');
    }, 3000);

    const redirectTimeout = setTimeout(() => {
      navigate('/');
    }, 4500);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);
  
  
  return (
    <div className="welcome-container">
      <h1 className={`welcome-heading ${fadeClass}`}>Welcome {name}!</h1>
    </div>
  )
}

export default WelcomePage;