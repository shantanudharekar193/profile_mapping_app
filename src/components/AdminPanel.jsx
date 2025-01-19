// src/components/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { getProfiles, addProfile, updateProfile, deleteProfile } from "../services/api";
import './AdminPanel.css';


const AdminPanel = () => {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    location: { lat: "", lng: "" },
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profiles when the component mounts
  useEffect(() => {
    getProfiles().then(setProfiles);
  }, []);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("location")
        ? { ...prev.location, [name.split(".")[1]]: parseFloat(value) }
        : value,
    }));
  };

  // Add or update profile
  const handleAddOrUpdate = async () => {
    if (isEditing) {
      await updateProfile(formData);
    } else {
      await addProfile(formData);
    }
    setProfiles(await getProfiles()); // Refresh profile list
    setFormData({ id: null, name: "", description: "", location: { lat: "", lng: "" } });
    setIsEditing(false); // Reset form
  };

  // Edit a profile
  const handleEdit = (profile) => {
    setFormData(profile);
    setIsEditing(true);
  };

  // Delete a profile
  const handleDelete = async (id) => {
    await deleteProfile(id);
    setProfiles(await getProfiles()); // Refresh profile list
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="admin-actions">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="location.lat"
          placeholder="Latitude"
          value={formData.location.lat}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="location.lng"
          placeholder="Longitude"
          value={formData.location.lng}
          onChange={handleInputChange}
        />
        <button className="admin-button" onClick={handleAddOrUpdate}>
          {isEditing ? "Update Profile" : "Add Profile"}
        </button>
      </div>

      <h3>Profile List</h3>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            <span>{profile.name}</span>
            <button className="admin-button" onClick={() => handleEdit(profile)}>Edit</button>
            <button className="admin-button" onClick={() => handleDelete(profile.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
