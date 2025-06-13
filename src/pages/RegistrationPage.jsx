import React, { useState } from 'react';
import Button from '../components/Button'
import '../styles/RegistrationPage.css'
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../services/UserService';

function RegistrationPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const user = {
        email,
        password,
        username
      };

      const { data } = await createUser(user);
      console.log('Successfully registered:', data);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className='registration-container'>
      <div className='register-box'>
        <h1>Register</h1>
        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <div>
            <label htmlFor='confirm-password'>Confirm Password:</label>
            <input
              type='password'
              id='confirm-password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <Button type="submit" className='register-btn'>Register Account</Button>
        </form>
        <br />
        <br />
        <p>Already have an account? <Link to='/login'><b>Login here!</b></Link></p>
      </div>
    </div>
  );
}

export default RegistrationPage;