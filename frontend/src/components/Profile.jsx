import React, { useState, useEffect, useRef } from "react";
import avatarImg from "../assets/avatar.png";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", avatar: "" });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    setEditMode(false);
    setMessage("Profile updated successfully!");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow flex flex-col items-center">
      <div className="relative mb-4">
        <img
          src={user.avatar || avatarImg}
          alt="User Avatar"
          className="w-24 h-24 rounded-full ring-2 ring-blue-200 object-cover"
        />
        {editMode && (
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 bg-blue-600 text-white px-2 py-1 rounded-full text-xs hover:bg-blue-700"
          >
            Change
          </button>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
      </div>
      <h2 className="text-2xl font-semibold mb-2">My Profile</h2>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      <form onSubmit={handleSave} className="space-y-4 w-full">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={user.name || ''}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email || ''}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex gap-2 justify-center">
          {editMode ? (
            <>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Edit Profile
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile; 