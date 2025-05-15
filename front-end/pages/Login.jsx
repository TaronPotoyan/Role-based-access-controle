import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlerForgotpassword = () => {
      navigate('/forgot-password')
  }


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/users/one/one', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        setError(result.message || 'Login failed');
        return;
      }
      
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate(`/home`);
    } catch (e) {
      console.error('Login error:', e);
      setError('Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="forgot-password">
            <button
              type="button"
              className="link-button"
              onClick={handlerForgotpassword}
            >
              Forgot Password?
            </button>
          </div>
        </div>
        <button type="submit" >Login</button>
      </form>
      <div className="register-link">
        <p>Don't have an account?</p>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
};

export default Login;
