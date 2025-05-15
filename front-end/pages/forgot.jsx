import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/forgot`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        navigate(`/forgot-password/${data.key}`, { state: { email } });
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message || 'Something went wrong');
      });
  };

  return (
    <div className="forgot-container">
      <h2 className="forgot-title">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label className="forgot-label">Enter your email:</label>
        <input
          type="email"
          className="forgot-input"
          placeholder="your@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {message && (
          <p
            style={{
              color: 'red',
              fontWeight: 'bold',
              marginTop: '10px',
              fontSize: '14px',
            }}
          >
            {message}
          </p>
        )}
        <button type="submit" className="forgot-button">
          Submit
        </button>
      </form>
    </div>
  );
}
