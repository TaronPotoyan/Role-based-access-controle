import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, avatar , _id } = location.state || {};

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleDeleteUser = () => {
    
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      localStorage.removeItem("user");
  
      fetch('http://localhost:3001/users/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id })  
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete user");
        }
        navigate("/");
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        alert("Failed to delete account. Try again.");
      });
    }
  };
  

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={
              avatar
          }
          alt="User Avatar"
          className="profile-avatar"
        />
        <h2 className="profile-name">{name}</h2>
        <p className="profile-email">{email}</p>
        <div className="profile-actions">
          <button className="delete-btn" onClick={handleDeleteUser}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
