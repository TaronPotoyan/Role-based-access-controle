import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Header({ user }) {  
  const navigate = useNavigate();
  console.log(user)  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <h1>My App</h1>
        </div>
        <div className="user-info">
          {user ? (
            <>
              <img
                src={user.avatar}
                alt="User Avatar"
                className="user-avatar"
              />
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button onClick={() => navigate('/')}>Login</button>
          )}
        </div>
      </nav>
    </header>
  );
}
