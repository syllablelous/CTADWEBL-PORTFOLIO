import React, { useState } from 'react';
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const redirectPath = await login(email, password);
      navigate(redirectPath);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>
        </form>
        <br />
        <Button className='login-btn' onClick={handleSubmit} disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </Button>
        <br />
        <br />
        <p>Don't have an account yet? <Link to='/register'><b>Register here!</b></Link></p>
      </div>
    </div>
  );
}

export default LoginPage;