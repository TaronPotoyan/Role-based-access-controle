import { json } from "body-parser";
import { useEffect, useState } from "react";
import { data, useLocation, useNavigate, useParams } from "react-router-dom";

export default function Forgot_key() {
  const { key } = useParams();  
  const locator = useLocation();
  const email = locator.state.email;
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigator = useNavigate();




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/forgot/${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, key }),  
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Password has been reset successfully.');
        navigator('/');
      } else {
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setMessage('Failed to send request. Try again later.');
    }
  };

  return (
    <div className="forgot-container">
      <h2 className="forgot-title">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label className="forgot-label">Enter your email:</label>
        <input
          type="email"
          className="forgot-input"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly
        />

        <label className="forgot-label" style={{ marginTop: '15px' }}>Enter new password:</label>
        <input
          type={showPassword ? "text" : "password"}
          className="forgot-input"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword" style={{ marginLeft: '5px' }}>
            Show Password
          </label>
        </div>

        <button type="submit" className="forgot-button" style={{ marginTop: '15px' }}>
          Reset Password
        </button>
      </form>
      {message && <p className="forgot-message" style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}
