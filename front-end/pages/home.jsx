import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from '../components/header';

export default function Homepage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  console.log(currentUser)

  useEffect(() => {
    if (!currentUser) {
      alert('Please log in');
      navigate('/');
    } else {
      fetch('http://localhost:3001/users')
        .then((res) => res.json())
        .then(setUsers)
        .catch((e) => console.error(`Error: ${e}`));
    }
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    fetch('http://localhost:3001/users/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Delete failed');
        setUsers((prev) => prev.filter((u) => u._id !== id));
      })
      .catch((e) => console.error(e));
  };

  const handleMakeAdmin = (id) => {
    fetch('http://localhost:3001/admins/123', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Make admin failed');
  
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, Role: 'admin' } : user
          )
        );
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <Header user = {currentUser} />
      <div className="homepage-container">
        <h2>All Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul className="user-list">
           {users.map((user) => {
                const isAdmin = user.Role === 'admin';
                const showActions = currentUser?.role === 'admin' && !isAdmin;
                console.log(isAdmin)
                return (
                  <li
                    key={user._id}
                    className={`user-item ${isAdmin ? 'admin-user' : ''}`}
                  >
                    <img
                      src={user.avatar}
                      alt={`${user.name}'s avatar`}
                      className="user-avatar"
                    />

                    <div className={`user-details ${isAdmin ? 'admin-style' : ''}`}>
                      <h4>{user.name}</h4>
                      <p>{user.email}</p>
                      {isAdmin && <span className="admin-badge">ADMIN</span>}
                    </div>

                    {showActions && (
                      <div className="user-options">
                        <button
                          className="options-button"
                          onClick={() => handleDelete(user._id)}
                          title="Delete user"
                        >
                          Delete
                        </button>
                        <button
                          className="options-button make-admin"
                          onClick={() => handleMakeAdmin(user._id)}
                          title="Make admin"
                        >
                          Make Admin
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}

          </ul>
        )}
      </div>
    </>
  );
}
