import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, avatar, _id } = location.state || {};

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(avatar || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      if (avatar && !avatar.startsWith("http")) {
        setAvatarUrl(`http://localhost:3001/api/photos/${avatar}`);
      }
    } else {
      navigate("/");
    }
  }, [navigate, avatar]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

const handleUploadAvatar = async () => {
  if (!selectedFile) {
    alert("Please select a file first");
    return;
  }

  setUploading(true);

  const formData = new FormData();
  formData.append("photo", selectedFile);
  formData.append("_id", _id); 

  try {
    const response = await fetch("http://localhost:3001/api/photos", {
      method: "POST",
      body: formData, 
    });

    // if (!response.ok) throw new Error("Upload failed");

    const data = await response.json();
    const photoId = data.url.split("/").pop();
    console.log(photoId);
    

    // const updateResponse = await fetch(`http://localhost:3001/users/${_id}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ avatar: photoId }),
    // });

    // if (!updateResponse.ok) throw new Error("Failed to update avatar");

    const updatedUser = JSON.parse(localStorage.getItem("user"));
    updatedUser.avatar = photoId;
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setAvatarUrl(`http://localhost:3001/api/photos/${photoId}`);
    setSelectedFile(null);
    alert("Avatar updated successfully!");
  } catch (error) {
    console.error(error);
    alert("Error uploading avatar. Try again.");
  } finally {
    setUploading(false);
  }
};


  const handleDeleteUser = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      localStorage.removeItem("user");

      fetch("http://localhost:3001/users/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
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
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUploadAvatar} disabled={uploading}>
        {uploading ? "Uploading..." : "Change Avatar"}
      </button>

      <div className="profile-card">
        <img src={avatarUrl} alt="User Avatar" className="profile-avatar" />
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
