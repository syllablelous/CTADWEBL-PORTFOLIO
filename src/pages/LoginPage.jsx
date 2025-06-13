import React, { useState } from 'react';
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'
import { loginUser } from '../services/UserService';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });

    navigate('/welcome', { state: { name: email }});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      console.log('Login successful:', data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('type', data.type);

      navigate('/dashboard', { state: { firstName: data.firstName, type: data.type } });
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input 
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </form>
        <br />
        <Button className='login-btn' onClick={handleLogin}>Login</Button>
        <br />
        <br />
        <p>Don't have an account yet? <Link to='/register'><b>Register here!</b></Link></p>
      </div>
    </div>
  );
}

export default LoginPage;