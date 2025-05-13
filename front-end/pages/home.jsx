import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from '../components/header';

export default function Homepage() {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user'));
  console.log('curent' , currentUser)
  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((e) => console.error(`Error: ${e}`));
  }, []);

  return (
    <>
      <Header user={currentUser} />
      <div className="homepage-container">
        <h2>All Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul className="user-list">
            {users.map((user, index) => (
              <li
                className={`user-item ${user.Role === 'admin' ? 'admin-user' : ''}`}
                key={index}
              >
                <img
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  className="user-avatar"
                />
                <div className="user-details">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
                {currentUser?.role === 'admin' && (
                  <button
                    className="view-button"
                    onClick={() => navigate(`/user/${user._id}`)}
                  >
                    View
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
