import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Header({ user }) {  
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleViewProfile = () => {
    navigate(`/profile/${user._id}`);
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
              <div className="user-actions">
                <button 
                  className="profile-button"
                  onClick={handleViewProfile}
                >
                  View Profile
                </button>
                <button 
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <button onClick={() => navigate('/')}>Login</button>
          )}
        </div>
      </nav>
    </header>
  );
}